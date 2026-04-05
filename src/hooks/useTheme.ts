import { useCallback, useEffect, useSyncExternalStore } from 'react'

const STORAGE_KEY = 'portfolio-theme'
type Theme = 'light' | 'dark'

function getStoredTheme(): Theme | null {
  if (typeof window === 'undefined') return null
  const raw = localStorage.getItem(STORAGE_KEY)
  if (raw === 'light' || raw === 'dark') return raw
  return null
}

function getSystemTheme(): Theme {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyTheme(theme: Theme): void {
  document.documentElement.classList.toggle('dark', theme === 'dark')
  localStorage.setItem(STORAGE_KEY, theme)
}

let themeState: Theme = 'light'
const listeners = new Set<() => void>()

function subscribe(cb: () => void): () => void {
  listeners.add(cb)
  return () => listeners.delete(cb)
}

function emit(): void {
  listeners.forEach((cb) => cb())
}

function initTheme(): void {
  const stored = getStoredTheme()
  themeState = stored ?? getSystemTheme()
  applyTheme(themeState)
}

if (typeof window !== 'undefined') {
  initTheme()
}

export function useTheme(): {
  theme: Theme
  setTheme: (t: Theme) => void
  toggleTheme: () => void
} {
  const theme = useSyncExternalStore(
    subscribe,
    (): Theme => themeState,
    (): Theme => 'light',
  )

  const setTheme = useCallback((next: Theme) => {
    themeState = next
    applyTheme(next)
    emit()
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }, [theme, setTheme])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (): void => {
      if (getStoredTheme()) return
      const next: Theme = mq.matches ? 'dark' : 'light'
      themeState = next
      applyTheme(next)
      emit()
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return { theme, setTheme, toggleTheme }
}

