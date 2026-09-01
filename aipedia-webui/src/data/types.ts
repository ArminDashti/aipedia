export type LinkRow = {
  owner: string
  name: string
  description: string
  github: string | null
  url?: string
  logo?: string
}

export type CatalogSection<T extends LinkRow = LinkRow> = {
  id: string
  title: string
  description?: string
  rows: T[]
}

export type CompanyRow = {
  logo: string
  company: string
  flag: string
  country: string
  foundYear: number | null
  url?: string
}

export type ModelRow = {
  logo: string
  model: string
  owner: string
  openSource: boolean
  openWeight: boolean
  introducedAt: string
  inputPrice: string
  outputPrice: string
  context: string
  /** One parameter size per line when a model has multiple variants. */
  parameters: string
  url?: string
}

export type CodeRow = {
  logo: string
  code: string
  owner: string
  byok: boolean
  freePlan: boolean
  paidPlan: boolean
  cli: boolean
  editor: boolean
  url?: string
}

export type ChatBotRow = {
  logo: string
  owner: string
  chatbot: string
  freePlan: boolean
  paidPlan: boolean
  url?: string
}
