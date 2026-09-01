const SITE_NAME = 'AIPedia'
const DEFAULT_DESCRIPTION =
  'AIPedia is a public AI knowledge encyclopedia. Browse catalogs of skills, MCP servers, tools, repos, companies, models, code editors, and chatbots.'
const OG_IMAGE = `${__SITE_URL__}/og.png`
const JSON_LD_ID = 'aipedia-json-ld'

export type RouteSeo = {
  title: string
  description: string
  path: string
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attr, key)
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

function upsertLink(rel: string, href: string) {
  let element = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null
  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', rel)
    document.head.appendChild(element)
  }
  element.setAttribute('href', href)
}

function upsertJsonLd(data: Record<string, unknown>) {
  let element = document.getElementById(JSON_LD_ID) as HTMLScriptElement | null
  if (!element) {
    element = document.createElement('script')
    element.id = JSON_LD_ID
    element.type = 'application/ld+json'
    document.head.appendChild(element)
  }
  element.textContent = JSON.stringify(data)
}

function absoluteUrl(path: string): string {
  if (!path || path === '/') return `${__SITE_URL__}/`
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${__SITE_URL__}${normalized}`
}

export function applyRouteSeo(seo: RouteSeo) {
  const title = seo.title || `${SITE_NAME} — AI Knowledge Encyclopedia`
  const description = seo.description || DEFAULT_DESCRIPTION
  const url = absoluteUrl(seo.path)

  document.title = title

  upsertMeta('name', 'description', description)
  upsertLink('canonical', url)

  upsertMeta('property', 'og:type', 'website')
  upsertMeta('property', 'og:site_name', SITE_NAME)
  upsertMeta('property', 'og:locale', 'en_US')
  upsertMeta('property', 'og:url', url)
  upsertMeta('property', 'og:title', title)
  upsertMeta('property', 'og:description', description)
  upsertMeta('property', 'og:image', OG_IMAGE)
  upsertMeta('property', 'og:image:alt', title)

  upsertMeta('name', 'twitter:card', 'summary_large_image')
  upsertMeta('name', 'twitter:title', title)
  upsertMeta('name', 'twitter:description', description)
  upsertMeta('name', 'twitter:image', OG_IMAGE)

  upsertJsonLd({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${__SITE_URL__}/#website`,
        name: SITE_NAME,
        url: `${__SITE_URL__}/`,
        description: DEFAULT_DESCRIPTION,
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
        name: title,
        description,
        isPartOf: { '@id': `${__SITE_URL__}/#website` },
        inLanguage: 'en',
      },
    ],
  })
}
