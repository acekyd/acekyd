<template>
  <main class="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
    <section class="mx-auto w-full max-w-[520px] px-4 py-10">
      <!-- Top profile block -->
      <div class="text-center">
        <div class="mx-auto h-20 w-20 overflow-hidden rounded-full border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <img
            alt="AceKYD"
            class="h-full w-full object-cover"
            src="/author.jpg"
          />
        </div>

        <h1 class="mt-4 text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
          Adewale “Ace” Abati
        </h1>
        <p class="mt-1 text-sm text-gray-600 dark:text-gray-300">
          Web Engineer • Developer Advocate • Open Source
        </p>

        <div v-if="pending" class="mt-8 text-sm text-gray-500 dark:text-gray-400">
          Loading links…
        </div>

        <div v-else-if="error" class="mt-8 rounded-xl border border-red-200 bg-red-50 p-4 text-left text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-200">
          Could not load links.
          <div class="mt-1 text-xs opacity-80">{{ errorMessage }}</div>
        </div>
      </div>

      <!-- Links -->
      <div v-if="items.length" class="mt-8 space-y-6">
        <!-- Primary link -->
        <div v-if="primaryLink" class="space-y-3">
          <a
            :href="primaryLink.url"
            target="_blank"
            rel="noopener"
            class="group block rounded-2xl border border-emerald-200 bg-gradient-to-b from-emerald-50 to-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-[1px] hover:shadow-md active:translate-y-0 dark:border-emerald-900/60 dark:from-emerald-950/30 dark:to-gray-950 no-underline hover:bg-transparent"
          >
            <div class="flex items-center justify-between gap-4">
              <div class="min-w-0">
                <div class="flex items-center gap-2">
                  <span class="inline-flex items-center rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-medium text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">
                    Featured
                  </span>
                </div>
                <div class="mt-2 flex items-center gap-2">
                  <span
                    v-if="primaryLink.icon?.type === 'emoji'"
                    class="inline-flex h-6 w-6 items-center justify-center rounded-md border border-gray-200 bg-white text-[16px] leading-none shadow-sm dark:border-gray-800 dark:bg-gray-900"
                    aria-hidden="true"
                  >
                    {{ primaryLink.icon.emoji }}
                  </span>
                  <img
                    v-else-if="primaryLink.icon && (primaryLink.icon.type === 'external' || primaryLink.icon.type === 'file')"
                    :src="primaryLink.icon.url"
                    alt=""
                    class="h-6 w-6 rounded-md object-cover"
                    loading="lazy"
                    referrerpolicy="no-referrer"
                  />
                  <span
                    v-else
                    class="inline-flex h-6 w-6 items-center justify-center rounded-md border border-gray-200 bg-white text-[16px] leading-none shadow-sm dark:border-gray-800 dark:bg-gray-900"
                    aria-hidden="true"
                  >
                    🔗
                  </span>
                  <div class="truncate text-base font-semibold text-gray-900 dark:text-gray-100">
                    {{ primaryLink.title }}
                  </div>
                </div>
                <div v-if="primaryLink.description" class="mt-1 text-sm text-gray-600 dark:text-gray-300">
                  {{ primaryLink.description }}
                </div>
              </div>

              <span class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 transition-colors group-hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200 dark:group-hover:bg-gray-800">
                <font-awesome-icon :icon="['fas', 'arrow-up-right-from-square']" />
              </span>
            </div>
          </a>
        </div>

        <!-- Grouped links (if any categories exist) -->
        <div v-if="hasCategories" class="space-y-6">
          <div v-for="group in grouped" :key="group.category" class="space-y-3">
            <h2 class="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              {{ group.category }}
            </h2>

            <div class="space-y-3">
              <a
                v-for="link in group.items"
                :key="link.id"
                :href="link.url"
                target="_blank"
                rel="noopener"
                class="group block rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-[1px] hover:shadow-md active:translate-y-0 dark:border-gray-800 dark:bg-gray-950 no-underline hover:bg-white dark:hover:bg-gray-950"
              >
                <div class="flex items-center justify-between gap-4">
                  <div class="min-w-0">
                    <div class="flex items-center gap-2">
                      <span
                        v-if="link.icon?.type === 'emoji'"
                        class="inline-flex h-6 w-6 items-center justify-center rounded-md border border-gray-200 bg-gray-50 text-[16px] leading-none dark:border-gray-800 dark:bg-gray-900"
                        aria-hidden="true"
                      >
                        {{ link.icon.emoji }}
                      </span>
                      <img
                        v-else-if="link.icon && (link.icon.type === 'external' || link.icon.type === 'file')"
                        :src="link.icon.url"
                        alt=""
                        class="h-6 w-6 rounded-md object-cover"
                        loading="lazy"
                        referrerpolicy="no-referrer"
                      />
                      <span
                        v-else
                        class="inline-flex h-6 w-6 items-center justify-center rounded-md border border-gray-200 bg-gray-50 text-[16px] leading-none dark:border-gray-800 dark:bg-gray-900"
                        aria-hidden="true"
                      >
                        🔗
                      </span>
                      <div class="truncate text-base font-medium text-gray-900 dark:text-gray-100">
                        {{ link.title }}
                      </div>
                    </div>
                    <div v-if="link.description" class="mt-1 text-sm text-gray-600 dark:text-gray-300">
                      {{ link.description }}
                    </div>
                  </div>

                  <span class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 transition-colors group-hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200 dark:group-hover:bg-gray-800">
                    <font-awesome-icon :icon="['fas', 'chevron-right']" />
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>

        <!-- Ungrouped links -->
        <div v-else class="space-y-3">
          <a
            v-for="link in nonPrimary"
            :key="link.id"
            :href="link.url"
            target="_blank"
            rel="noopener"
            class="group block rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-[1px] hover:shadow-md active:translate-y-0 dark:border-gray-800 dark:bg-gray-950 no-underline hover:bg-white dark:hover:bg-gray-950"
          >
            <div class="flex items-center justify-between gap-4">
              <div class="min-w-0">
                <div class="flex items-center gap-2">
                  <span
                    v-if="link.icon?.type === 'emoji'"
                    class="inline-flex h-6 w-6 items-center justify-center rounded-md border border-gray-200 bg-gray-50 text-[16px] leading-none dark:border-gray-800 dark:bg-gray-900"
                    aria-hidden="true"
                  >
                    {{ link.icon.emoji }}
                  </span>
                  <img
                    v-else-if="link.icon && (link.icon.type === 'external' || link.icon.type === 'file')"
                    :src="link.icon.url"
                    alt=""
                    class="h-6 w-6 rounded-md object-cover"
                    loading="lazy"
                    referrerpolicy="no-referrer"
                  />
                  <span
                    v-else
                    class="inline-flex h-6 w-6 items-center justify-center rounded-md border border-gray-200 bg-gray-50 text-[16px] leading-none dark:border-gray-800 dark:bg-gray-900"
                    aria-hidden="true"
                  >
                    🔗
                  </span>
                  <div class="truncate text-base font-medium text-gray-900 dark:text-gray-100">
                    {{ link.title }}
                  </div>
                </div>
                <div v-if="link.description" class="mt-1 text-sm text-gray-600 dark:text-gray-300">
                  {{ link.description }}
                </div>
              </div>

              <span class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 transition-colors group-hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200 dark:group-hover:bg-gray-800">
                <font-awesome-icon :icon="['fas', 'chevron-right']" />
              </span>
            </div>
          </a>
        </div>

        <footer class="pt-4 text-center text-xs text-gray-500 dark:text-gray-400">
          © AceKYD
        </footer>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
type LinkItem = {
  id: string
  title: string
  url: string
  description?: string
  category?: string
  featured?: boolean
  primary?: boolean
  order?: number
  icon?:
    | { type: 'emoji'; emoji: string }
    | { type: 'external'; url: string }
    | { type: 'file'; url: string }
}

type LinksResponse = {
  generatedAt: string
  count: number
  items: LinkItem[]
}

useSeoMeta({
  title: 'Links - AceKYD',
  description: 'Quick links for Adewale “Ace” Abati',
  ogTitle: 'Links - AceKYD',
  ogDescription: 'Quick links for Adewale “Ace” Abati',
  themeColor: '#12b488',
  colorScheme: 'light dark'
})

const { data, pending, error } = await useFetch<LinksResponse>('/api/links', {
  server: true
})

const items = computed(() => data.value?.items || [])

const primaryLink = computed(() => items.value.find((l) => l.primary))

const nonPrimary = computed(() => items.value.filter((l) => !l.primary))

const hasCategories = computed(() => nonPrimary.value.some((l) => Boolean(l.category)))

const grouped = computed(() => {
  const map = new Map<string, LinkItem[]>()

  for (const item of nonPrimary.value) {
    const key = item.category || 'Links'
    if (!map.has(key)) map.set(key, [])
    map.get(key)!.push(item)
  }

  return Array.from(map.entries()).map(([category, groupItems]) => ({
    category,
    items: groupItems
  }))
})

const errorMessage = computed(() => {
  const e: any = error.value
  return e?.statusMessage || e?.message || String(e || '')
})
</script>

<style scoped>
/* Ensure page looks good even if global body is light by default */
main {
  background: radial-gradient(1200px 500px at 50% 0%, rgba(18, 180, 136, 0.10), transparent 55%);
}

:global(html.dark) main {
  background: radial-gradient(1200px 500px at 50% 0%, rgba(18, 180, 136, 0.20), transparent 55%);
}


/* Kill global link styling (underline + hover background) for this page */
a {
  text-decoration: none !important;
}

a:hover {
  text-decoration: none !important;
  background: transparent !important;
}

</style>
