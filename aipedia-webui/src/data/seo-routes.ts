export type SeoRoute = {
  path: string
  name: string
  title: string
  description: string
  heading: string
  pageDescription: string
}

export const DEFAULT_SEO_DESCRIPTION =
  'AIPedia is a public AI knowledge encyclopedia. Browse catalogs of skills, MCP servers, tools, companies, models, code editors, and chatbots.'

export const seoRoutes: SeoRoute[] = [
  {
    path: '/skills',
    name: 'skills',
    title: 'Skills — AIPedia',
    description:
      'Browse agent skills and instruction packs for coding agents. Catalog of reusable AI agent skills on AIPedia.',
    heading: 'Skills',
    pageDescription: 'Agent skills and instruction packs for coding agents.',
  },
  {
    path: '/mcp',
    name: 'mcp',
    title: 'MCP Servers — AIPedia',
    description:
      'Discover Model Context Protocol (MCP) servers and registries for AI agents and tools.',
    heading: 'MCP',
    pageDescription: 'Model Context Protocol servers and registries.',
  },
  {
    path: '/tools',
    name: 'tools',
    title: 'Tools — AIPedia',
    description:
      'AI tools for agents, memory, RAG, compression, and vector databases — browsable on AIPedia.',
    heading: 'Tools',
    pageDescription: 'Agents, memory, RAG, compression, and vector databases.',
  },
  {
    path: '/companies',
    name: 'companies',
    title: 'Companies — AIPedia',
    description: 'AI companies and research labs — a curated company catalog on AIPedia.',
    heading: 'Companies',
    pageDescription: 'AI companies and labs.',
  },
  {
    path: '/models',
    name: 'models',
    title: 'Models — AIPedia',
    description:
      'Major AI model families and open-weight lines with pricing, context, and parameters.',
    heading: 'Models',
    pageDescription:
      'Each model version is listed separately. Parameters show size variants on separate lines.',
  },
  {
    path: '/code',
    name: 'code',
    title: 'Code Editors & Agents — AIPedia',
    description: 'Code editors and CLI coding agents compared in the AIPedia catalog.',
    heading: 'Code',
    pageDescription:
      'Code editors and CLI coding agents. Green ✓ / red ✗ for plan and surface support.',
  },
  {
    path: '/chatbots',
    name: 'chatbots',
    title: 'ChatBots — AIPedia',
    description: 'Major consumer chatbot products and plans cataloged on AIPedia.',
    heading: 'ChatBots',
    pageDescription: 'Major consumer chatbot products and their free or paid plans.',
  },
]

export function getSeoRoute(path: string): SeoRoute | undefined {
  return seoRoutes.find((route) => route.path === path)
}
