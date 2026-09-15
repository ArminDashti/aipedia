/** True when the SPA is served on an admin-dedicated hostname. */
export function isAdminHost(hostname = typeof window !== 'undefined' ? window.location.hostname : ''): boolean {
  if (!hostname) return false
  return (
    hostname === 'aipedia-admin.xaigrok.ir' ||
    hostname.startsWith('aipedia-admin.') ||
    hostname === 'admin-aipedia.xaigrok.ir' ||
    hostname.startsWith('admin-aipedia.')
  )
}
