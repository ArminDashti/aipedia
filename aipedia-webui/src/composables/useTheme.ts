import { ref, watch } from 'vue'

export type ThemeMode = 'dark' | 'light'

const STORAGE_KEY = 'aipedia-theme'

const theme = ref<ThemeMode>('dark')
let initialized = false

function readStoredTheme(): ThemeMode {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') return stored
  } catch {
    /* ignore */
  }
  return 'dark'
}

function applyTheme(mode: ThemeMode) {
  const root = document.documentElement
  if (mode === 'dark') {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }
  try {
    localStorage.setItem(STORAGE_KEY, mode)
  } catch {
    /* ignore */
  }
}

export function initTheme() {
  if (initialized) return
  initialized = true
  theme.value = readStoredTheme()
  applyTheme(theme.value)
  watch(theme, (mode) => applyTheme(mode))
}

export function useTheme() {
  initTheme()

  function setTheme(mode: ThemeMode) {
    theme.value = mode
  }

  function toggleTheme() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }

  return {
    theme,
    setTheme,
    toggleTheme,
  }
}
