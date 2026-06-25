<template>
  <header
    class="sticky top-0 z-40 border-b transition-colors duration-300"
    :class="scrolled ? 'border-border bg-bg/80 backdrop-blur-xl' : 'border-transparent bg-transparent'"
  >
    <div class="container-wide flex h-16 items-center justify-between gap-4">
      <NuxtLink
        to="/"
        class="group flex items-center gap-2 font-semibold tracking-tight text-ink no-underline"
        aria-label="Home — Adewale Abati"
      >
        <span
          class="grid h-8 w-8 place-items-center rounded-lg border border-border bg-surface text-sm font-bold text-accent transition-colors group-hover:border-accent/50"
        >
          A
        </span>
        <span class="hidden sm:inline">Adewale Abati</span>
      </NuxtLink>

      <nav class="hidden items-center gap-1 md:flex" aria-label="Primary">
        <NuxtLink
          v-for="item in nav"
          :key="item.to"
          :to="item.to"
          class="rounded-full px-3 py-1.5 text-sm font-medium text-ink-faint no-underline transition-colors hover:text-ink"
          active-class="!text-ink"
          exact-active-class="!text-accent"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>

      <div class="flex items-center gap-1.5">
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-sm text-ink-faint transition-colors hover:text-ink"
          aria-label="Search the site"
          @click="searchOpen = true"
        >
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" />
          </svg>
          <span class="hidden lg:inline">Search</span>
          <kbd class="hidden rounded border border-border px-1.5 text-[10px] font-medium lg:inline">⌘K</kbd>
        </button>

        <ThemeToggle />

        <button
          type="button"
          class="grid h-9 w-9 place-items-center rounded-full border border-border bg-surface text-ink md:hidden"
          :aria-expanded="mobileOpen"
          aria-label="Toggle menu"
          @click="mobileOpen = !mobileOpen"
        >
          <svg v-if="!mobileOpen" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
      </div>
    </div>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      leave-active-class="transition duration-150 ease-in"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <nav
        v-if="mobileOpen"
        class="border-t border-border bg-bg/95 backdrop-blur-xl md:hidden"
        aria-label="Mobile"
      >
        <div class="container-wide flex flex-col py-2">
          <NuxtLink
            v-for="item in nav"
            :key="item.to"
            :to="item.to"
            class="rounded-lg px-3 py-3 text-base font-medium text-ink-soft no-underline transition-colors hover:bg-surface hover:text-ink"
            exact-active-class="!text-accent"
            @click="mobileOpen = false"
          >
            {{ item.label }}
          </NuxtLink>
        </div>
      </nav>
    </Transition>

    <SearchPalette v-model:open="searchOpen" />
  </header>
</template>

<script setup lang="ts">
const appConfig = useAppConfig()
const nav = appConfig.nav

const scrolled = ref(false)
const mobileOpen = ref(false)
const searchOpen = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 8
}

function onKeydown(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    searchOpen.value = true
  }
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKeydown)
})
</script>
