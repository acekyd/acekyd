// Lightweight, dependency-free color-mode handling.
// The initial class is set by an inline head script (see nuxt.config) to avoid FOUC.
import { ref } from 'vue'

type Theme = 'light' | 'dark'

const theme = ref<Theme>('dark')
const ready = ref(false)

function apply(next: Theme) {
  theme.value = next
  if (import.meta.client) {
    const root = document.documentElement
    root.classList.toggle('dark', next === 'dark')
    root.style.colorScheme = next
    try {
      localStorage.setItem('theme', next)
    } catch (_) {
      /* ignore */
    }
  }
}

export function useTheme() {
  function init() {
    if (!import.meta.client || ready.value) return
    const stored = (() => {
      try {
        return localStorage.getItem('theme') as Theme | null
      } catch (_) {
        return null
      }
    })()
    theme.value = stored ?? 'dark'
    document.documentElement.classList.toggle('dark', theme.value === 'dark')
    ready.value = true

    // Dark is the site default. System changes should not override it unless the user toggles.
  }

  function toggle() {
    apply(theme.value === 'dark' ? 'light' : 'dark')
  }

  return { theme, ready, init, toggle, setTheme: apply }
}
