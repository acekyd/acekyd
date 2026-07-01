<template>
  <button
    type="button"
    class="grid h-9 w-9 place-items-center rounded-full border border-border bg-surface text-ink-soft transition-colors hover:text-ink"
    :aria-label="theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'"
    @click="toggle"
  >
    <ClientOnly>
      <svg v-if="theme === 'dark'" class="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      </svg>
      <svg v-else class="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
      <template #fallback>
        <span class="h-[18px] w-[18px]" />
      </template>
    </ClientOnly>
  </button>
</template>

<script setup lang="ts">
const { theme, toggle, init } = useTheme()
onMounted(init)
</script>
