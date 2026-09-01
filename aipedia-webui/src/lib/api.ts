export type ApiEntry = {
  id: number
  name: string
  nameUrl?: string | null
  logoUrl?: string | null
  ownerName?: string | null
  ownerUrl?: string | null
  websiteUrl?: string | null
  description?: string | null
  origin?: string | null
  freePlan?: string | null
  paidPlan?: string | null
  links?: string | null
  attrs?: Record<string, unknown>
  categoryId: number
  categoryPath: string
  categoryTitle: string
}

export type ApiCategory = {
  id: number
  path: string
  slug: string
  title: string
  kind: string
  parentPath?: string | null
  sourcePath?: string | null
  childCount: number
  entryCount: number
}

export type EntryWriteBody = {
  categoryId: number
  name: string
  nameUrl?: string | null
  logoUrl?: string | null
  ownerName?: string | null
  ownerUrl?: string | null
  websiteUrl?: string | null
  description?: string | null
  origin?: string | null
  freePlan?: string | null
  paidPlan?: string | null
  links?: string | null
  attrs?: Record<string, unknown>
}

const TOKEN_KEY = 'aipedia_admin_token'

export function getApiBase(): string {
  const base = import.meta.env.VITE_API_BASE_URL
  if (base && base.trim()) {
    return base.replace(/\/$/, '')
  }
  return ''
}

export function getAdminToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY)
  } catch {
    return null
  }
}

export function setAdminToken(token: string | null): void {
  try {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token)
    } else {
      localStorage.removeItem(TOKEN_KEY)
    }
  } catch {
    /* ignore */
  }
}

async function apiFetch<T>(
  path: string,
  init: RequestInit = {},
  auth = false,
): Promise<T> {
  const headers = new Headers(init.headers)
  if (!headers.has('Content-Type') && init.body) {
    headers.set('Content-Type', 'application/json')
  }
  if (auth) {
    const token = getAdminToken()
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
  }
  const res = await fetch(`${getApiBase()}${path}`, { ...init, headers })
  if (!res.ok) {
    let message = `HTTP ${res.status}`
    try {
      const body = (await res.json()) as { error?: string }
      if (body.error) message = body.error
    } catch {
      /* ignore */
    }
    throw new Error(message)
  }
  if (res.status === 204) {
    return undefined as T
  }
  return (await res.json()) as T
}

export async function searchEntries(q: string): Promise<ApiEntry[]> {
  const data = await apiFetch<{ entries: ApiEntry[] }>(
    `/api/entries?q=${encodeURIComponent(q)}`,
  )
  return data.entries ?? []
}

export async function login(username: string, password: string): Promise<{ token: string; username: string }> {
  const data = await apiFetch<{ token: string; username: string }>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  })
  setAdminToken(data.token)
  return data
}

export async function logout(): Promise<void> {
  try {
    await apiFetch('/api/auth/logout', { method: 'POST' }, true)
  } finally {
    setAdminToken(null)
  }
}

export async function fetchMe(): Promise<{ id: number; username: string }> {
  return apiFetch('/api/admin/me', {}, true)
}

export async function adminListEntries(q = ''): Promise<ApiEntry[]> {
  const qs = q.trim() ? `?q=${encodeURIComponent(q.trim())}` : ''
  const data = await apiFetch<{ entries: ApiEntry[] }>(`/api/admin/entries${qs}`, {}, true)
  return data.entries ?? []
}

export async function adminListCategories(): Promise<ApiCategory[]> {
  const data = await apiFetch<{ categories: ApiCategory[] }>('/api/admin/categories', {}, true)
  return data.categories ?? []
}

export async function adminCreateEntry(body: EntryWriteBody): Promise<ApiEntry> {
  return apiFetch('/api/admin/entries', { method: 'POST', body: JSON.stringify(body) }, true)
}

export async function adminUpdateEntry(id: number, body: EntryWriteBody): Promise<ApiEntry> {
  return apiFetch(`/api/admin/entries/${id}`, { method: 'PUT', body: JSON.stringify(body) }, true)
}

export async function adminDeleteEntry(id: number): Promise<void> {
  await apiFetch(`/api/admin/entries/${id}`, { method: 'DELETE' }, true)
}
