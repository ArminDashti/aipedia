import type { CatalogSection, LinkRow } from './types'

export const mcpSections: CatalogSection[] = [
  {
    id: 'registries',
    title: 'Registries & Official Resources',
    description: 'Official MCP docs, reference servers, and public directories.',
    rows: [
      {
        owner: 'Anthropic',
        name: 'MCP Official Site',
        description:
          'Official Model Context Protocol docs, specs, and guides for clients and servers',
        github: null,
        url: 'https://modelcontextprotocol.io/',
        logo: 'https://www.google.com/s2/favicons?domain=modelcontextprotocol.io&sz=32',
      },
      {
        owner: 'Anthropic',
        name: 'MCP Registry',
        description: 'Official public registry for discovering and browsing published MCP servers',
        github: null,
        url: 'https://registry.modelcontextprotocol.io/',
        logo: 'https://www.google.com/s2/favicons?domain=registry.modelcontextprotocol.io&sz=32',
      },
      {
        owner: 'modelcontextprotocol',
        name: 'MCP Servers',
        description: 'Reference MCP server implementations and pointers to community servers',
        github: 'https://github.com/modelcontextprotocol/servers',
        logo: 'https://www.google.com/s2/favicons?domain=github.com&sz=32',
      },
      {
        owner: 'Smithery',
        name: 'Smithery',
        description: 'Registry and directory of MCP servers for AI agents and coding tools',
        github: null,
        url: 'https://smithery.ai/',
        logo: 'https://www.google.com/s2/favicons?domain=smithery.ai&sz=32',
      },
    ],
  },
  {
    id: 'code',
    title: 'Code & Context',
    description: 'Code indexing, symbol retrieval, and token-efficient exploration.',
    rows: [
      {
        owner: 'CodeGraphContext',
        name: 'CodeGraphContext',
        description:
          'MCP + CLI that indexes local code into a graph DB for call chains, hierarchy, and code context',
        github: 'https://github.com/CodeGraphContext/CodeGraphContext',
        url: 'https://cgc.codes/',
        logo: 'https://www.google.com/s2/favicons?domain=cgc.codes&sz=32',
      },
      {
        owner: 'yfedoseev',
        name: 'Fossil MCP',
        description:
          'Static analysis MCP/CLI for vibe-coded projects: dead code, clones, and scaffolding across languages',
        github: 'https://github.com/yfedoseev/fossil-mcp',
        url: 'https://fossil-mcp.com',
        logo: 'https://www.google.com/s2/favicons?domain=github.com&sz=32',
      },
      {
        owner: 'jgravelle',
        name: 'jCodeMunch MCP',
        description:
          'MCP server for symbol-level GitHub code retrieval via tree-sitter AST; cuts token use on code exploration',
        github: 'https://github.com/jgravelle/jcodemunch-mcp',
        logo: 'https://www.google.com/s2/favicons?domain=github.com&sz=32',
      },
      {
        owner: 'manojmallick',
        name: 'Sigmap',
        description:
          '~97% token reduction for AI coding sessions; zero deps, 33 languages, MCP server',
        github: 'https://github.com/manojmallick/sigmap',
        logo: 'https://www.google.com/s2/favicons?domain=github.com&sz=32',
      },
    ],
  },
  {
    id: 'database',
    title: 'Database & Vector',
    description: 'SQL and vector-database MCP servers.',
    rows: [
      {
        owner: 'executeautomation',
        name: 'MCP Database Server',
        description:
          'MCP server for SQLite, SQL Server, PostgreSQL, and MySQL with query, schema, and export tools',
        github: 'https://github.com/executeautomation/mcp-database-server',
        logo: 'https://www.google.com/s2/favicons?domain=github.com&sz=32',
      },
      {
        owner: 'RichardHan',
        name: 'MSSQL MCP Server',
        description:
          'MCP server for Microsoft SQL Server / Azure SQL: list tables, run queries, multiple auth modes',
        github: 'https://github.com/RichardHan/mssql_mcp_server',
        logo: 'https://www.google.com/s2/favicons?domain=github.com&sz=32',
      },
      {
        owner: 'qdrant',
        name: 'Qdrant MCP Server',
        description:
          'Official MCP server for semantic search and memory over a Qdrant vector database',
        github: 'https://github.com/qdrant/mcp-server-qdrant',
        logo: 'https://www.google.com/s2/favicons?domain=qdrant.tech&sz=32',
      },
    ],
  },
  {
    id: 'browser',
    title: 'Browser Automation',
    description: 'LLM-friendly browser control via accessibility snapshots.',
    rows: [
      {
        owner: 'microsoft',
        name: 'Playwright MCP',
        description:
          'Browser automation MCP using Playwright accessibility snapshots for LLM-friendly page interaction',
        github: 'https://github.com/microsoft/playwright-mcp',
        url: 'https://playwright.dev',
        logo: 'https://www.google.com/s2/favicons?domain=playwright.dev&sz=32',
      },
    ],
  },
  {
    id: 'research',
    title: 'Research & Web',
    description: 'Deep research, fetch, search, and crawl tools over MCP.',
    rows: [
      {
        owner: 'dondai44423',
        name: 'DonSeTch',
        description: 'MCP tools for keyless web fetch, search, and crawl built for AI agents',
        github: 'https://github.com/dondai44423/donsetch',
        logo: 'https://www.google.com/s2/favicons?domain=github.com&sz=32',
      },
      {
        owner: 'assafelovic',
        name: 'GPT Researcher MCP',
        description:
          'MCP server that runs GPT Researcher deep research for LLM apps over the MCP protocol',
        github: 'https://github.com/assafelovic/gptr-mcp',
        logo: 'https://www.google.com/s2/favicons?domain=github.com&sz=32',
      },
    ],
  },
  {
    id: 'design',
    title: 'Design',
    description: 'Design tokens and UI context for coding agents.',
    rows: [
      {
        owner: 'Manavarya09',
        name: 'Designlang MCP',
        description:
          'MCP server exposing extracted design tokens, regions, components, and contrast pairs to coding agents',
        github: 'https://github.com/Manavarya09/design-extract',
        logo: 'https://www.google.com/s2/favicons?domain=github.com&sz=32',
      },
    ],
  },
  {
    id: 'infra',
    title: 'Infrastructure & Compression',
    description: 'MCP proxies and tool-surface compression.',
    rows: [
      {
        owner: 'Atlassian Labs',
        name: 'MCP Compressor',
        description:
          'MCP proxy/SDK that compresses large tool lists and loads full schemas on demand',
        github: 'https://github.com/atlassian-labs/mcp-compressor',
        url: 'https://atlassian-labs.github.io/mcp-compressor/',
        logo: 'https://www.google.com/s2/favicons?domain=atlassian.com&sz=32',
      },
    ],
  },
]

export const mcp: LinkRow[] = mcpSections.flatMap((section) => section.rows)
