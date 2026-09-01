import fs from 'node:fs/promises'
import path from 'node:path'
import type { Plugin } from 'vite'
import { seoRoutes, type SeoRoute } from '../src/data/seo-routes'
import { skills } from '../src/data/skills'
import { mcp } from '../src/data/mcp'
import { tools } from '../src/data/tools'
import { companies } from '../src/data/companies'
import { models } from '../src/data/models'
import { code } from '../src/data/code'
import { chatbots } from '../src/data/chatbots'
import { companyHomeUrl, companyIconSrc } from '../src/data/company-icons'

function sortRows(
  rows: Record<string, unknown>[],
  key: string,
  dir: 'asc' | 'desc' = 'asc',
): Record<string, unknown>[] {
  const sign = dir === 'asc' ? 1 : -1
  return [...rows].sort((left, right) => {
    const a = left[key] == null ? '' : String(left[key])
    const b = right[key] == null ? '' : String(right[key])
    return sign * a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })
  })
}

type Column = {
  key: string
  label: string
  type?: 'text' | 'logo' | 'link' | 'multiline' | 'tick' | 'flag-country' | 'brand' | 'named-link'
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function cellText(row: Record<string, unknown>, column: Column): string {
  if (column.type === 'tick') {
    return row[column.key] === true ? 'Yes' : 'No'
  }
  if (column.type === 'flag-country') {
    return `${String(row.flag ?? '')} ${String(row.country ?? '')}`.trim()
  }
  if (column.type === 'link') {
    const href = typeof row[column.key] === 'string' ? (row[column.key] as string) : ''
    return href || (typeof row.url === 'string' ? row.url : '')
  }
  if (column.type === 'logo') {
    return typeof row[column.key] === 'string' ? (row[column.key] as string) : ''
  }
  const value = row[column.key]
  return value == null ? '' : String(value)
}

function namedLinkHref(row: Record<string, unknown>, column: Column): string {
  const cell = row[column.key]
  if (typeof cell === 'string' && /^https?:\/\//i.test(cell)) return cell
  if (typeof row.github === 'string' && row.github) return row.github
  if (typeof row.url === 'string' && row.url) return row.url
  return ''
}

function brandHref(row: Record<string, unknown>, name: string, columnKey: string): string {
  return (
    companyHomeUrl(name) ||
    (typeof row.url === 'string' ? row.url : '') ||
    (columnKey === 'owner' && name ? `https://github.com/${name}` : '')
  )
}

function renderCell(row: Record<string, unknown>, column: Column): string {
  if (column.type === 'link') {
    const href = cellText(row, column)
    if (!href) return '—'
    return `<a href="${escapeHtml(href)}" rel="noopener noreferrer">${escapeHtml(href)}</a>`
  }
  if (column.type === 'named-link') {
    const label = cellText(row, column)
    const href = namedLinkHref(row, column)
    if (!label) return '—'
    if (!href) return escapeHtml(label)
    return `<a href="${escapeHtml(href)}" rel="noopener noreferrer">${escapeHtml(label)}</a>`
  }
  if (column.type === 'brand') {
    const name = cellText(row, column)
    if (!name) return '—'
    const icon = companyIconSrc(name) || (typeof row.logo === 'string' ? row.logo : '')
    const href = brandHref(row, name, column.key)
    const mark = icon
      ? `<img src="${escapeHtml(icon)}" alt="" width="24" height="24" /> `
      : ''
    const label = href
      ? `<a href="${escapeHtml(href)}" rel="noopener noreferrer">${escapeHtml(name)}</a>`
      : escapeHtml(name)
    return `${mark}${label}`
  }
  if (column.type === 'logo') {
    const src = cellText(row, column)
    if (!src) return '—'
    return `<img src="${escapeHtml(src)}" alt="" width="24" height="24" />`
  }
  const text = cellText(row, column)
  if (!text) return '—'
  if (column.type === 'multiline') {
    return escapeHtml(text).replaceAll('\n', '<br />')
  }
  return escapeHtml(text)
}

function renderTable(columns: Column[], rows: Record<string, unknown>[]): string {
  const head = columns
    .map((column) => `<th>${escapeHtml(column.label)}</th>`)
    .join('')
  const body = rows
    .map((row) => {
      const cells = columns.map((column) => `<td>${renderCell(row, column)}</td>`).join('')
      return `<tr>${cells}</tr>`
    })
    .join('')

  return `<table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>`
}

function catalogFor(routeName: string): { columns: Column[]; rows: Record<string, unknown>[] } {
  switch (routeName) {
    case 'skills':
      return {
        columns: [
          { key: 'owner', label: 'Owner', type: 'brand' },
          { key: 'name', label: 'Skill', type: 'named-link' },
          { key: 'description', label: 'Description' },
        ],
        rows: sortRows(skills as unknown as Record<string, unknown>[], 'owner'),
      }
    case 'mcp':
      return {
        columns: [
          { key: 'owner', label: 'Owner', type: 'brand' },
          { key: 'name', label: 'MCP', type: 'named-link' },
          { key: 'description', label: 'Description' },
        ],
        rows: sortRows(mcp as unknown as Record<string, unknown>[], 'owner'),
      }
    case 'tools':
      return {
        columns: [
          { key: 'owner', label: 'Owner', type: 'brand' },
          { key: 'name', label: 'Tool', type: 'named-link' },
          { key: 'description', label: 'Description' },
        ],
        rows: sortRows(tools as unknown as Record<string, unknown>[], 'owner'),
      }
    case 'companies':
      return {
        columns: [
          { key: 'company', label: 'Company', type: 'brand' },
          { key: 'country', label: 'Country', type: 'flag-country' },
          { key: 'foundYear', label: 'Found (Year)' },
        ],
        rows: sortRows(companies as unknown as Record<string, unknown>[], 'company'),
      }
    case 'models':
      return {
        columns: [
          { key: 'owner', label: 'Owner', type: 'brand' },
          { key: 'model', label: 'Model', type: 'named-link' },
          { key: 'openSource', label: 'OpenSource', type: 'tick' },
          { key: 'openWeight', label: 'OpenWeight', type: 'tick' },
          { key: 'introducedAt', label: 'Introduced' },
          { key: 'inputPrice', label: 'Input (~/M)' },
          { key: 'outputPrice', label: 'Output (~/M)' },
          { key: 'context', label: 'Context' },
          { key: 'parameters', label: 'Parameters', type: 'multiline' },
        ],
        rows: sortRows(models as unknown as Record<string, unknown>[], 'introducedAt', 'desc'),
      }
    case 'code':
      return {
        columns: [
          { key: 'owner', label: 'Owner', type: 'brand' },
          { key: 'code', label: 'Code', type: 'named-link' },
          { key: 'byok', label: 'BYOK', type: 'tick' },
          { key: 'freePlan', label: 'Free plan', type: 'tick' },
          { key: 'paidPlan', label: 'Paid plan', type: 'tick' },
          { key: 'cli', label: 'CLI', type: 'tick' },
          { key: 'editor', label: 'Editor', type: 'tick' },
        ],
        rows: sortRows(code as unknown as Record<string, unknown>[], 'owner'),
      }
    case 'chatbots':
      return {
        columns: [
          { key: 'owner', label: 'Owner', type: 'brand' },
          { key: 'chatbot', label: 'ChatBot', type: 'named-link' },
          { key: 'freePlan', label: 'Free plan', type: 'tick' },
          { key: 'paidPlan', label: 'Paid plan', type: 'tick' },
        ],
        rows: sortRows(chatbots as unknown as Record<string, unknown>[], 'owner'),
      }
    default:
      return { columns: [], rows: [] }
  }
}

function absoluteUrl(siteUrl: string, routePath: string): string {
  if (!routePath || routePath === '/') return `${siteUrl}/`
  return `${siteUrl}${routePath}`
}

function replaceMeta(html: string, attr: 'name' | 'property', key: string, content: string): string {
  const pattern = new RegExp(
    `<meta\\s+${attr}="${key}"\\s+content="[^"]*"\\s*/?>`,
    'i',
  )
  const tag = `<meta ${attr}="${key}" content="${escapeHtml(content)}" />`
  if (pattern.test(html)) {
    return html.replace(pattern, tag)
  }
  return html.replace('</head>', `    ${tag}\n  </head>`)
}

function replaceCanonical(html: string, href: string): string {
  const pattern = /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i
  const tag = `<link rel="canonical" href="${escapeHtml(href)}" />`
  if (pattern.test(html)) {
    return html.replace(pattern, tag)
  }
  return html.replace('</head>', `    ${tag}\n  </head>`)
}

function replaceTitle(html: string, title: string): string {
  return html.replace(/<title>[^<]*<\/title>/i, `<title>${escapeHtml(title)}</title>`)
}

function replaceJsonLd(html: string, siteUrl: string, route: SeoRoute): string {
  const url = absoluteUrl(siteUrl, route.path)
  const payload = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        name: 'AIPedia',
        url: `${siteUrl}/`,
        description:
          'A public AI knowledge encyclopedia with catalogs of skills, MCP, tools, companies, models, code, and chatbots.',
        inLanguage: 'en',
        author: {
          '@type': 'Person',
          name: 'Armin Dashti',
          url: 'https://armindashti.github.io/',
        },
      },
      {
        '@type': 'CollectionPage',
        '@id': `${url}#webpage`,
        url,
        name: route.title,
        description: route.description,
        isPartOf: { '@id': `${siteUrl}/#website` },
        inLanguage: 'en',
      },
    ],
  }

  const script = `<script id="aipedia-json-ld" type="application/ld+json">${JSON.stringify(payload)}</script>`
  return html.replace(
    /<script id="aipedia-json-ld" type="application\/ld\+json">[\s\S]*?<\/script>/i,
    script,
  )
}

function renderPrerenderBody(route: SeoRoute): string {
  const nav = [...seoRoutes]
    .sort((a, b) => a.heading.localeCompare(b.heading, undefined, { sensitivity: 'base' }))
    .map(
      (item) =>
        `<a href="${escapeHtml(item.path)}">${escapeHtml(item.heading)}</a>`,
    )
    .join(' · ')
  const catalog = catalogFor(route.name)
  const table =
    catalog.rows.length > 0
      ? renderTable(catalog.columns, catalog.rows)
      : '<p>No entries yet.</p>'

  return [
    '<div id="app">',
    '<header><a href="/skills">AIPedia</a><nav aria-label="Primary">',
    nav,
    '</nav></header>',
    '<main>',
    `<h1>${escapeHtml(route.heading)}</h1>`,
    `<p>${escapeHtml(route.pageDescription)}</p>`,
    table,
    '</main>',
    '</div>',
  ].join('')
}

function applyRouteHtml(template: string, siteUrl: string, route: SeoRoute): string {
  const url = absoluteUrl(siteUrl, route.path)
  let html = template

  html = replaceTitle(html, route.title)
  html = replaceMeta(html, 'name', 'description', route.description)
  html = replaceCanonical(html, url)
  html = replaceMeta(html, 'property', 'og:url', url)
  html = replaceMeta(html, 'property', 'og:title', route.title)
  html = replaceMeta(html, 'property', 'og:description', route.description)
  html = replaceMeta(html, 'property', 'og:image:alt', route.title)
  html = replaceMeta(html, 'name', 'twitter:title', route.title)
  html = replaceMeta(html, 'name', 'twitter:description', route.description)
  html = replaceJsonLd(html, siteUrl, route)

  const body = renderPrerenderBody(route)
  html = html.replace(/<div id="app"><\/div>/i, body)

  return html
}

export function seoPrerenderPlugin(siteUrl: string): Plugin {
  return {
    name: 'aipedia-seo-prerender',
    apply: 'build',
    async closeBundle() {
      const outDir = path.resolve(process.cwd(), 'dist')
      const templatePath = path.join(outDir, 'index.html')
      const template = await fs.readFile(templatePath, 'utf8')

      for (const route of seoRoutes) {
        const html = applyRouteHtml(template, siteUrl, route)
        const routeDir = path.join(outDir, route.path.replace(/^\//, ''))
        await fs.mkdir(routeDir, { recursive: true })
        await fs.writeFile(path.join(routeDir, 'index.html'), html, 'utf8')
      }

      // `/` redirects to skills in the SPA; give crawlers the skills document at root too.
      const skills = seoRoutes.find((route) => route.name === 'skills')
      if (skills) {
        await fs.writeFile(
          templatePath,
          applyRouteHtml(template, siteUrl, skills),
          'utf8',
        )
      }

      console.log(
        `[seo-prerender] Wrote ${seoRoutes.length} route HTML files + root index.html`,
      )
    },
  }
}
