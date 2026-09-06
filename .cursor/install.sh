#!/usr/bin/env bash
# Idempotent bootstrap for the AIPedia monorepo (Go API + Vue/Vite web UI).
# Runs after the repo is checked out. Safe to re-run.
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
API_DIR="$REPO_ROOT/aipedia-api"
WEBUI_DIR="$REPO_ROOT/aipedia-webui"

echo "==> aipedia-api: preparing environment"
cd "$API_DIR"
# Create a local .env from the template only if one does not already exist.
[ -f .env ] || cp .env.example .env
mkdir -p data tmp

# go.mod pins go 1.25; GOTOOLCHAIN=auto fetches it on demand. Warm the module
# cache and toolchain, then build the server so first boot is fast.
go mod download
go build -o ./tmp/server ./cmd/server

# air provides hot-reload for the API dev terminal (see .air.toml).
go install github.com/air-verse/air@v1.61.7

echo "==> aipedia-webui: installing dependencies"
cd "$WEBUI_DIR"
[ -f .env ] || cp .env.example .env
# Use the lockfile for deterministic installs; fall back to npm install if the
# lockfile and manifest have drifted.
npm ci || npm install

echo "==> AIPedia install complete"
