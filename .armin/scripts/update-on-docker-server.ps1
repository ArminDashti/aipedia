<#
.SYNOPSIS
  Update aipedia (api + webui) on Irancell-T3 over SSH.

.DESCRIPTION
  Reads update-on-docker-server.yaml — builds both images locally, uploads,
  syncs compose, and runs remote compose up -d. Keeps SQLite volume by default.
#>
[CmdletBinding()]
param(
    [switch]$Stop
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$DeployDir = $PSScriptRoot
$RepoRoot = [System.IO.Path]::GetFullPath((Join-Path $DeployDir '../..'))
$ConfigPath = Join-Path $DeployDir 'update-on-docker-server.yaml'

function Write-Step([string]$Message) {
    Write-Host ">> $Message" -ForegroundColor Cyan
}

function Write-Ok([string]$Message) {
    Write-Host "OK  $Message" -ForegroundColor Green
}

function Write-Fail([string]$Message) {
    Write-Host "ERR $Message" -ForegroundColor Red
}

function Test-Truthy([string]$Value) {
    if ([string]::IsNullOrWhiteSpace($Value)) { return $false }
    return $Value.Trim().ToLowerInvariant() -in @('yes', 'true', '1', 'y', 'on')
}

function Read-FlatYaml([string]$Path) {
    if (-not (Test-Path -LiteralPath $Path)) {
        throw "Missing config: $Path"
    }
    $map = @{}
    foreach ($raw in Get-Content -LiteralPath $Path) {
        $line = $raw.Trim()
        if ($line -eq '' -or $line.StartsWith('#')) { continue }
        if ($line -match '^\s*-') { continue }
        if ($line -notmatch '^(?<key>[^:#]+):\s*(?<val>.*)$') { continue }
        $key = $Matches['key'].Trim()
        $val = $Matches['val'].Trim()
        if (($val.StartsWith('"') -and $val.EndsWith('"')) -or ($val.StartsWith("'") -and $val.EndsWith("'"))) {
            $val = $val.Substring(1, $val.Length - 2)
        }
        $map[$key] = $val
    }
    return $map
}

function Require-Key($Map, [string]$Key) {
    if (-not $Map.ContainsKey($Key) -or [string]::IsNullOrWhiteSpace([string]$Map[$Key])) {
        throw "YAML missing required key: $Key"
    }
    return [string]$Map[$Key]
}

function Resolve-DeployPath([string]$RelativePath) {
    $candidate = Join-Path $DeployDir $RelativePath
    $fullPath = [System.IO.Path]::GetFullPath($candidate)
    if (-not (Test-Path -LiteralPath $fullPath)) {
        throw "Path not found: $fullPath"
    }
    return $fullPath
}

function Get-LongFilePath([string]$Path) {
    $full = [System.IO.Path]::GetFullPath($Path)
    if (Test-Path -LiteralPath $full) {
        return (Get-Item -LiteralPath $full).FullName
    }
    return $full
}

function Ensure-Docker {
    docker version *> $null
    if ($LASTEXITCODE -ne 0) { throw 'Docker CLI is not available. Start Docker Desktop / daemon.' }
}

function Parse-SshTarget([string]$SshValue) {
    $value = $SshValue.Trim()
    if ($value -match '^(?i)ssh\s+(?<rest>.+)$') {
        $tokens = @($Matches['rest'] -split '\s+' | Where-Object { $_ -ne '' })
        if ($tokens.Count -lt 1) { throw 'ssh alias mode requires a Host alias.' }

        $alias = $null
        $sshArgs = New-Object System.Collections.Generic.List[string]
        $scpArgs = New-Object System.Collections.Generic.List[string]
        $i = 0
        while ($i -lt $tokens.Count) {
            $tok = $tokens[$i]
            if ($tok -eq '-p' -or $tok -eq '-P') {
                if ($i + 1 -ge $tokens.Count) { throw 'ssh -p requires a port number.' }
                $port = $tokens[$i + 1]
                [void]$sshArgs.Add('-p')
                [void]$sshArgs.Add($port)
                [void]$scpArgs.Add('-P')
                [void]$scpArgs.Add($port)
                $i += 2
                continue
            }
            if ($tok.StartsWith('-')) { throw "Unsupported ssh option '$tok'." }
            if ($null -ne $alias) { throw "Multiple SSH hosts in: $SshValue" }
            $alias = $tok
            $i++
        }
        if ($null -eq $alias) { throw 'ssh alias missing.' }
        $logExtra = if ($sshArgs.Count -gt 0) { ' ' + ($sshArgs -join ' ') } else { '' }
        return @{
            Mode      = 'alias'
            Alias     = $alias
            SshArgs   = @($sshArgs)
            ScpArgs   = @($scpArgs)
            LogTarget = "ssh $alias$logExtra"
        }
    }
    throw 'ssh must be "ssh <alias> [-p <port>]".'
}

function Invoke-Remote {
    param($Target, [string]$RemoteCommand)
    & ssh @($Target.SshArgs) -o BatchMode=yes $Target.Alias $RemoteCommand
    if ($LASTEXITCODE -ne 0) { throw "Remote command failed on $($Target.LogTarget)" }
}

function Copy-ToRemote {
    param($Target, [string]$LocalPath, [string]$RemotePath)
    & scp @($Target.ScpArgs) -o BatchMode=yes $LocalPath "$($Target.Alias):$RemotePath"
    if ($LASTEXITCODE -ne 0) { throw "SCP failed to $($Target.LogTarget):$RemotePath" }
}

function Build-Upload-Image {
    param(
        $Target,
        [string]$ImageTag,
        [string]$Dockerfile,
        [string]$BuildContext
    )

    Write-Step "Building $ImageTag (dockerfile=$Dockerfile context=$BuildContext)"
    docker build -f $Dockerfile -t $ImageTag $BuildContext
    if ($LASTEXITCODE -ne 0) { throw "docker build failed for $ImageTag" }
    Write-Ok "Built $ImageTag"

    $tarName = ($ImageTag -replace '[:/]', '_') + '.tar'
    $tarPath = Get-LongFilePath (Join-Path ([System.IO.Path]::GetTempPath()) $tarName)
    Write-Step "Saving image to $tarPath"
    docker save -o $tarPath $ImageTag
    if ($LASTEXITCODE -ne 0) { throw "docker save failed for $ImageTag" }

    $remoteTar = "/tmp/$tarName"
    try {
        Write-Step "Uploading $ImageTag to $($Target.LogTarget)"
        Copy-ToRemote -Target $Target -LocalPath $tarPath -RemotePath $remoteTar
        Invoke-Remote -Target $Target -RemoteCommand "docker load -i '$remoteTar' && rm -f '$remoteTar'"
        Write-Ok "Loaded $ImageTag on remote"
    }
    finally {
        Remove-Item -LiteralPath $tarPath -Force -ErrorAction SilentlyContinue
    }
}

try {
    $cfg = Read-FlatYaml $ConfigPath
    $stackName = Require-Key $cfg 'stack_name'
    $composeFileRel = Require-Key $cfg 'compose_file'
    $network = Require-Key $cfg 'docker_network'
    $sshValue = Require-Key $cfg 'ssh'
    $volumeDir = Require-Key $cfg 'volume_dir'
    $apiImageTag = Require-Key $cfg 'api_image_tag'
    $webuiImageTag = Require-Key $cfg 'webui_image_tag'
    $apiDockerfileRel = Require-Key $cfg 'api_dockerfile'
    $webuiDockerfileRel = Require-Key $cfg 'webui_dockerfile'
    $apiContextRel = Require-Key $cfg 'api_build_context'
    $webuiContextRel = Require-Key $cfg 'webui_build_context'
    $deleteVolume = Test-Truthy ($(if ($cfg.ContainsKey('delete_volume')) { [string]$cfg['delete_volume'] } else { 'no' }))
    $deleteImage = Test-Truthy ($(if ($cfg.ContainsKey('delete_image')) { [string]$cfg['delete_image'] } else { 'no' }))
    $buildImageOn = if ($cfg.ContainsKey('build_image_on')) { [string]$cfg['build_image_on'] } else { 'local' }
    $buildImageOn = $buildImageOn.Trim().ToLowerInvariant()

    if ($buildImageOn -ne 'local') {
        throw "This aipedia update script supports build_image_on=local only."
    }

    $target = Parse-SshTarget -SshValue $sshValue
    $composePath = Resolve-DeployPath $composeFileRel
    $composeFileName = Split-Path -Leaf $composePath
    $remoteCompose = "$volumeDir/$composeFileName"
    $composeFilesArg = "-f '$remoteCompose'"

    if ($Stop) {
        $downFlags = if ($deleteVolume) { '-v' } else { '' }
        Write-Step "Remote compose down (stack=$stackName)"
        Invoke-Remote -Target $target -RemoteCommand "docker compose -p '$stackName' $composeFilesArg --project-directory '$volumeDir' down $downFlags >/dev/null 2>&1 || true"
        Write-Ok "Stack stopped: $stackName on $($target.LogTarget)"
        exit 0
    }

    Ensure-Docker

    $apiDockerfile = Resolve-DeployPath $apiDockerfileRel
    $webuiDockerfile = Resolve-DeployPath $webuiDockerfileRel
    $apiContext = Resolve-DeployPath $apiContextRel
    $webuiContext = Resolve-DeployPath $webuiContextRel

    Write-Step "Remote target: $($target.LogTarget)"
    Write-Step "Stack=$stackName volume_dir=$volumeDir api=$apiImageTag webui=$webuiImageTag"

    Write-Step "Ensuring remote volume dir $volumeDir"
    Invoke-Remote -Target $target -RemoteCommand "mkdir -p '$volumeDir'"

    if ($deleteVolume -or $deleteImage) {
        $downFlags = if ($deleteVolume) { '-v' } else { '' }
        Write-Step 'Remote compose down before image refresh'
        Invoke-Remote -Target $target -RemoteCommand "docker compose -p '$stackName' $composeFilesArg --project-directory '$volumeDir' down $downFlags >/dev/null 2>&1 || true"
    }

    if ($deleteImage) {
        Write-Step 'Removing old remote images'
        Invoke-Remote -Target $target -RemoteCommand "docker image rm -f '$apiImageTag' '$webuiImageTag' || true"
    }

    Build-Upload-Image -Target $target -ImageTag $apiImageTag -Dockerfile $apiDockerfile -BuildContext $apiContext
    Build-Upload-Image -Target $target -ImageTag $webuiImageTag -Dockerfile $webuiDockerfile -BuildContext $webuiContext

    Write-Step "Sync $composeFileName"
    Copy-ToRemote -Target $target -LocalPath (Get-LongFilePath $composePath) -RemotePath $remoteCompose

    Write-Step "Ensuring remote network $network"
    Invoke-Remote -Target $target -RemoteCommand "docker network inspect '$network' >/dev/null 2>&1 || docker network create '$network'"

    $envPrefix = "API_IMAGE_TAG='$apiImageTag' WEBUI_IMAGE_TAG='$webuiImageTag' DOCKER_NETWORK='$network' "
    Write-Step 'Remote compose up -d'
    Invoke-Remote -Target $target -RemoteCommand "${envPrefix}docker compose -p '$stackName' $composeFilesArg --project-directory '$volumeDir' up -d --force-recreate"
    Write-Ok "Stack updated at $volumeDir on $($target.LogTarget)"
}
catch {
    Write-Fail $_.Exception.Message
    exit 1
}
