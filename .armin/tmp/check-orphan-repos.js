const fs = require('fs')
const path = require('path')

const reposTs = fs.readFileSync(
  'C:/Users/armin/GitHub/aipedia/aipedia-webui/src/data/repos.ts',
  'utf8',
)
const repos = [...reposTs.matchAll(/github\.com\/([^'"]+)/g)].map((m) => m[1])

function walk(dir) {
  const files = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === '.git' || entry.name === '.armin') continue
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) files.push(...walk(full))
    else if (entry.name.endsWith('.md')) files.push(full)
  }
  return files
}

const content = walk('C:/Users/armin/GitHub/bookmarks')
  .map((file) => fs.readFileSync(file, 'utf8'))
  .join('\n')

const orphans = repos.filter((repo) => !content.includes(repo))
console.log('total', repos.length, 'orphans', orphans.length)
orphans.forEach((repo) => console.log(repo))
