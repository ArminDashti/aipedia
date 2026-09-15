import { describe, expect, it } from 'vitest'
import { isAdminHost } from '@/lib/admin-host'

describe('isAdminHost', () => {
  it('matches aipedia-admin and legacy admin-aipedia hosts', () => {
    expect(isAdminHost('aipedia-admin.xaigrok.ir')).toBe(true)
    expect(isAdminHost('aipedia-admin.local')).toBe(true)
    expect(isAdminHost('admin-aipedia.xaigrok.ir')).toBe(true)
    expect(isAdminHost('admin-aipedia.dev')).toBe(true)
    expect(isAdminHost('aipedia.xaigrok.ir')).toBe(false)
    expect(isAdminHost('')).toBe(false)
  })
})
