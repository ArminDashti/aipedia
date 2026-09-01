export type CompanyMark = {
  icon: string
  url?: string
}

const marks: Record<string, CompanyMark> = {
  Alibaba: { icon: '/logos/alibaba.svg', url: 'https://www.alibabagroup.com' },
  Amazon: { icon: '/logos/amazon.svg', url: 'https://aws.amazon.com' },
  AWS: { icon: '/logos/amazon.svg', url: 'https://aws.amazon.com' },
  Anthropic: { icon: '/logos/anthropic.svg', url: 'https://anthropic.com' },
  Anysphere: { icon: '/logos/cursor.svg', url: 'https://cursor.com' },
  'Cursor (Anysphere)': { icon: '/logos/cursor.svg', url: 'https://cursor.com' },
  'Character.AI': { icon: '/logos/characterai.svg', url: 'https://character.ai' },
  Cline: { icon: '/logos/cline.svg', url: 'https://cline.bot' },
  Cognition: { icon: '/logos/cognition.svg', url: 'https://devin.ai' },
  DeepSeek: { icon: '/logos/deepseek.svg', url: 'https://deepseek.com' },
  Google: { icon: '/logos/google.svg', url: 'https://ai.google' },
  'Google DeepMind': { icon: '/logos/deepmind.svg', url: 'https://deepmind.google' },
  GitHub: { icon: '/logos/github.svg', url: 'https://github.com' },
  Kilo: { icon: '/logos/kilo.svg', url: 'https://kilo.ai' },
  Meta: { icon: '/logos/meta.svg', url: 'https://www.meta.ai' },
  Microsoft: { icon: '/logos/microsoft.svg', url: 'https://microsoft.com' },
  'Mistral AI': { icon: '/logos/mistral.svg', url: 'https://mistral.ai' },
  OpenAI: { icon: '/logos/openai.svg', url: 'https://openai.com' },
  Perplexity: { icon: '/logos/perplexity.svg', url: 'https://www.perplexity.ai' },
  Quora: { icon: '/logos/quora.svg', url: 'https://poe.com' },
  'Tencent Hunyuan': { icon: '/logos/tencent.svg', url: 'https://hy.tencent.com' },
  Tencent: { icon: '/logos/tencent.svg', url: 'https://www.tencent.com' },
  xAI: { icon: '/logos/xai.svg', url: 'https://x.ai' },
  'Zed Industries': { icon: '/logos/zed.svg', url: 'https://zed.dev' },
}

const aliases: Record<string, string> = {
  alibaba: 'Alibaba',
  amazon: 'Amazon',
  aws: 'AWS',
  anthropic: 'Anthropic',
  anysphere: 'Anysphere',
  cursor: 'Cursor (Anysphere)',
  'character.ai': 'Character.AI',
  characterai: 'Character.AI',
  cline: 'Cline',
  cognition: 'Cognition',
  deepseek: 'DeepSeek',
  google: 'Google',
  googlegemini: 'Google',
  'google deepmind': 'Google DeepMind',
  deepmind: 'Google DeepMind',
  github: 'GitHub',
  kilo: 'Kilo',
  meta: 'Meta',
  microsoft: 'Microsoft',
  mistral: 'Mistral AI',
  'mistral ai': 'Mistral AI',
  openai: 'OpenAI',
  perplexity: 'Perplexity',
  quora: 'Quora',
  tencent: 'Tencent',
  'tencent hunyuan': 'Tencent Hunyuan',
  xai: 'xAI',
  x: 'xAI',
  zed: 'Zed Industries',
  'zed industries': 'Zed Industries',
}

export function canonicalCompanyName(name: string): string {
  const trimmed = name.trim()
  if (!trimmed) return trimmed
  return aliases[trimmed] ?? aliases[trimmed.toLowerCase()] ?? trimmed
}

export function companyIconSrc(name: string): string | null {
  const canonical = canonicalCompanyName(name)
  return marks[canonical]?.icon ?? null
}

export function companyHomeUrl(name: string): string | null {
  const canonical = canonicalCompanyName(name)
  return marks[canonical]?.url ?? null
}

export function companyLetter(name: string): string {
  const canonical = canonicalCompanyName(name)
  const letter = canonical.replace(/[^A-Za-z0-9]/g, '').charAt(0)
  return letter ? letter.toUpperCase() : '?'
}
