export type CatalogKind =
  | 'skills'
  | 'mcp'
  | 'tools'
  | 'companies'
  | 'models'
  | 'code'
  | 'chatbots'

export type CatalogSearchItem = {
  id: string
  kind: CatalogKind
  label: string
  subtitle: string
  description: string
  href: string
  url?: string | null
  logo?: string | null
}

const KIND_ROUTE: Record<CatalogKind, string> = {
  skills: '/skills',
  mcp: '/mcp',
  tools: '/tools',
  companies: '/companies',
  models: '/models',
  code: '/code',
  chatbots: '/chatbots',
}

export const KIND_LABEL: Record<CatalogKind, string> = {
  skills: 'Skill',
  mcp: 'MCP',
  tools: 'Tool',
  companies: 'Company',
  models: 'Model',
  code: 'Code',
  chatbots: 'ChatBot',
}

let cachedIndex: CatalogSearchItem[] | null = null

/** Build a searchable index from all static catalog modules. */
export async function buildCatalogIndex(): Promise<CatalogSearchItem[]> {
  if (cachedIndex) {
    return cachedIndex
  }

  const [
    { skills },
    { mcp },
    { tools },
    { companies },
    { models },
    { code },
    { chatbots },
  ] = await Promise.all([
    import('@/data/skills'),
    import('@/data/mcp'),
    import('@/data/tools'),
    import('@/data/companies'),
    import('@/data/models'),
    import('@/data/code'),
    import('@/data/chatbots'),
  ])

  const items: CatalogSearchItem[] = []

  for (const row of skills) {
    items.push({
      id: `skills:${row.owner}:${row.name}`,
      kind: 'skills',
      label: row.name,
      subtitle: row.owner,
      description: row.description,
      href: KIND_ROUTE.skills,
      url: row.url ?? row.github,
      logo: row.logo,
    })
  }
  for (const row of mcp) {
    items.push({
      id: `mcp:${row.owner}:${row.name}`,
      kind: 'mcp',
      label: row.name,
      subtitle: row.owner,
      description: row.description,
      href: KIND_ROUTE.mcp,
      url: row.url ?? row.github,
      logo: row.logo,
    })
  }
  for (const row of tools) {
    items.push({
      id: `tools:${row.owner}:${row.name}`,
      kind: 'tools',
      label: row.name,
      subtitle: row.owner,
      description: row.description,
      href: KIND_ROUTE.tools,
      url: row.url ?? row.github,
      logo: row.logo,
    })
  }
  for (const row of companies) {
    items.push({
      id: `companies:${row.company}`,
      kind: 'companies',
      label: row.company,
      subtitle: `${row.country}${row.foundYear ? ` · ${row.foundYear}` : ''}`,
      description: row.country,
      href: KIND_ROUTE.companies,
      url: row.url,
      logo: row.logo,
    })
  }
  for (const row of models) {
    items.push({
      id: `models:${row.owner}:${row.model}`,
      kind: 'models',
      label: row.model,
      subtitle: row.owner,
      description: `${row.context} · ${row.parameters.replace(/\n/g, ', ')}`,
      href: KIND_ROUTE.models,
      url: row.url,
      logo: row.logo,
    })
  }
  for (const row of code) {
    items.push({
      id: `code:${row.owner}:${row.code}`,
      kind: 'code',
      label: row.code,
      subtitle: row.owner,
      description: [
        row.cli ? 'CLI' : null,
        row.editor ? 'Editor' : null,
        row.byok ? 'BYOK' : null,
      ]
        .filter(Boolean)
        .join(' · '),
      href: KIND_ROUTE.code,
      url: row.url,
      logo: row.logo,
    })
  }
  for (const row of chatbots) {
    items.push({
      id: `chatbots:${row.owner}:${row.chatbot}`,
      kind: 'chatbots',
      label: row.chatbot,
      subtitle: row.owner,
      description: [row.freePlan ? 'Free' : null, row.paidPlan ? 'Paid' : null]
        .filter(Boolean)
        .join(' · '),
      href: KIND_ROUTE.chatbots,
      url: row.url,
      logo: row.logo,
    })
  }

  cachedIndex = items
  return items
}

function matches(item: CatalogSearchItem, q: string): boolean {
  const hay = `${item.label} ${item.subtitle} ${item.description} ${item.kind}`.toLowerCase()
  return hay.includes(q)
}

/** Filter catalog index by query (case-insensitive substring). */
export function searchCatalog(items: CatalogSearchItem[], query: string, limit = 40): CatalogSearchItem[] {
  const q = query.trim().toLowerCase()
  if (!q) {
    return []
  }
  return items.filter((item) => matches(item, q)).slice(0, limit)
}

/** Map API category path to a public catalog route when possible. */
export function categoryPathToHref(path: string): string {
  const p = path.toLowerCase()
  if (p.includes('skill')) return '/skills'
  if (p.includes('mcp')) return '/mcp'
  if (p.includes('chatbot')) return '/chatbots'
  if (p.includes('model')) return '/models'
  if (p.includes('compan')) return '/companies'
  if (p.includes('code') || p.includes('cli')) return '/code'
  if (p.includes('tool') || p.includes('repo') || p.includes('github')) return '/tools'
  return '/tools'
}
