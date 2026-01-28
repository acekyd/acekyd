<template>
  <main class="min-h-screen bg-gray-50 text-gray-900">
    <section class="mx-auto w-full max-w-[520px] px-4 py-10">
      <!-- Top profile block -->
      <div class="text-center">
        <div class="mx-auto h-20 w-20 overflow-hidden rounded-full border border-gray-200 bg-white shadow-sm">
          <img
            alt="AceKYD"
            class="h-full w-full object-cover"
            src="/author.jpg"
          />
        </div>

        <h1 class="mt-4 text-2xl font-semibold tracking-tight text-gray-900">
          Adewale “Ace” Abati
        </h1>
        <p class="mt-1 text-sm text-gray-600">
          Web Engineer • Developer Advocate • Open Source
        </p>

        <!-- Default social links (from home page) -->
        <div class="mt-5 space-y-3">
          <div class="flex justify-center gap-3">
            <a
              v-for="s in socialRow1"
              :key="s.label"
              :href="s.href"
              target="_blank"
              rel="noopener"
              class="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-800 shadow-sm transition-colors hover:bg-gray-50"
              :aria-label="s.ariaLabel"
              title=""
            >
              <font-awesome-icon :icon="s.icon" class="text-lg" />
            </a>
          </div>
          <div class="flex justify-center gap-3">
            <a
              v-for="s in socialRow2"
              :key="s.label"
              :href="s.href"
              target="_blank"
              rel="noopener"
              class="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-800 shadow-sm transition-colors hover:bg-gray-50"
              :aria-label="s.ariaLabel"
              title=""
            >
              <font-awesome-icon :icon="s.icon" class="text-lg" />
            </a>
          </div>
        </div>

        <div v-if="pending" class="mt-8 text-sm text-gray-500">
          Loading links…
        </div>

        <div v-else-if="error" class="mt-8 rounded-xl border border-red-200 bg-red-50 p-4 text-left text-sm text-red-700">
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
            class="group block rounded-2xl border border-emerald-200 bg-gradient-to-b from-emerald-50 to-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-[1px] hover:shadow-md active:translate-y-0 no-underline hover:bg-transparent"
          >
            <div class="flex items-center justify-between gap-4">
              <div class="min-w-0">
                <div class="flex items-center gap-2">
                  <span class="inline-flex items-center rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-medium text-emerald-800">
                    Featured
                  </span>
                </div>
                <div class="mt-2 flex items-center gap-2">
                  <span
                    v-if="primaryLink.icon?.type === 'emoji'"
                    class="inline-flex h-6 w-6 items-center justify-center rounded-md border border-gray-200 bg-white text-[16px] leading-none shadow-sm"
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
                    class="inline-flex h-6 w-6 items-center justify-center rounded-md border border-gray-200 bg-white text-[16px] leading-none shadow-sm"
                    aria-hidden="true"
                  >
                    🔗
                  </span>
                  <div class="truncate text-base font-semibold text-gray-900">
                    {{ primaryLink.title }}
                  </div>
                </div>
                <div v-if="primaryLink.description" class="mt-1 text-sm text-gray-600">
                  {{ primaryLink.description }}
                </div>
              </div>

              <span class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 transition-colors group-hover:bg-gray-50">
                <font-awesome-icon :icon="['fas', 'arrow-up-right-from-square']" />
              </span>
            </div>
          </a>
        </div>

        <!-- Grouped links (if any categories exist) -->
        <div v-if="hasCategories" class="space-y-6">
          <div v-for="group in grouped" :key="group.category" class="space-y-3">
            <h2 class="text-xs font-semibold uppercase tracking-wider text-gray-500">
              {{ group.category }}
            </h2>

            <div class="space-y-3">
              <a
                v-for="link in group.items"
                :key="link.id"
                :href="link.url"
                target="_blank"
                rel="noopener"
                class="group block rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-[1px] hover:shadow-md active:translate-y-0 no-underline hover:bg-white"
              >
                <div class="flex items-center justify-between gap-4">
                  <div class="min-w-0">
                    <div class="flex items-center gap-2">
                      <span
                        v-if="link.icon?.type === 'emoji'"
                        class="inline-flex h-6 w-6 items-center justify-center rounded-md border border-gray-200 bg-gray-50 text-[16px] leading-none"
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
                        class="inline-flex h-6 w-6 items-center justify-center rounded-md border border-gray-200 bg-gray-50 text-[16px] leading-none"
                        aria-hidden="true"
                      >
                        🔗
                      </span>
                      <div class="truncate text-base font-medium text-gray-900">
                        {{ link.title }}
                      </div>
                    </div>
                    <div v-if="link.description" class="mt-1 text-sm text-gray-600">
                      {{ link.description }}
                    </div>
                  </div>

                  <span class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 transition-colors group-hover:bg-gray-50">
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
            class="group block rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-[1px] hover:shadow-md active:translate-y-0 no-underline hover:bg-white"
          >
            <div class="flex items-center justify-between gap-4">
              <div class="min-w-0">
                <div class="flex items-center gap-2">
                  <span
                    v-if="link.icon?.type === 'emoji'"
                    class="inline-flex h-6 w-6 items-center justify-center rounded-md border border-gray-200 bg-gray-50 text-[16px] leading-none"
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
                    class="inline-flex h-6 w-6 items-center justify-center rounded-md border border-gray-200 bg-gray-50 text-[16px] leading-none"
                    aria-hidden="true"
                  >
                    🔗
                  </span>
                  <div class="truncate text-base font-medium text-gray-900">
                    {{ link.title }}
                  </div>
                </div>
                <div v-if="link.description" class="mt-1 text-sm text-gray-600">
                  {{ link.description }}
                </div>
              </div>

              <span class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 transition-colors group-hover:bg-gray-50">
                <font-awesome-icon :icon="['fas', 'chevron-right']" />
              </span>
            </div>
          </a>
        </div>

        <footer class="pt-4 text-center text-xs text-gray-500">
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

const config = useRuntimeConfig()
const route = useRoute()

const pageTitle = 'Links - AceKYD'
const pageDescription = 'Quick links for Adewale “Ace” Abati'
const pageUrl = computed(() => `${config.public.siteUrl}${route.path}`)

// Reuse existing site image (you can swap this for a dedicated /public og image later)
const socialImage =
  'https://res.cloudinary.com/acekyd/image/upload/v1657331180/Blog_Image_opnaq4.png'


useHead({
  link: [
    {
      rel: 'canonical',
      href: pageUrl.value
    }
  ]
})


useSeoMeta({
  title: pageTitle,
  description: pageDescription,

  ogType: 'website',
  ogTitle: pageTitle,
  ogDescription: pageDescription,
  ogUrl: pageUrl,
  ogImage: socialImage,
  ogImageWidth: 1200,
  ogImageHeight: 630,

  twitterCard: 'summary_large_image',
  twitterTitle: pageTitle,
  twitterDescription: pageDescription,
  twitterImage: socialImage,
  twitterCreator: '@ace_kyd',
  twitterSite: '@ace_kyd',

  themeColor: '#12b488',
  colorScheme: 'light'
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

const socialRow1 = computed(() => socialLinks.slice(0, 4))
const socialRow2 = computed(() => socialLinks.slice(4))

const socialLinks = [
  // Row 1 (requested)
  {
    label: 'YouTube',
    ariaLabel: 'Adewale on YouTube',
    href: 'https://youtube.com/@acekydtv',
    icon: ['fab', 'youtube']
  },
  {
    label: 'Instagram',
    ariaLabel: 'Adewale on Instagram',
    href: 'https://instagram.com/acekydtv',
    icon: ['fab', 'instagram']
  },
  {
    label: 'Twitter',
    ariaLabel: 'Adewale on Twitter',
    href: 'https://twitter.com/ace_kyd/',
    icon: ['fab', 'twitter']
  },
  {
    label: 'TikTok',
    ariaLabel: 'Adewale on TikTok',
    href: 'https://tiktok.com/@acekydtv',
    icon: ['fab', 'tiktok']
  },

  // Row 2
  {
    label: 'GitHub',
    ariaLabel: 'Adewale on GitHub',
    href: 'https://github.com/acekyd/',
    icon: ['fab', 'github']
  },
  {
    label: 'LinkedIn',
    ariaLabel: 'Adewale on LinkedIn',
    href: 'https://www.linkedin.com/in/acekyd/',
    icon: ['fab', 'linkedin']
  },
  {
    label: 'Twitch',
    ariaLabel: 'Adewale on Twitch',
    href: 'https://twitch.tv/acekydtv/',
    icon: ['fab', 'twitch']
  }
] as const
</script>

<style scoped>
/* Ensure page looks good even if global body is light by default */
main {
  background: radial-gradient(1200px 500px at 50% 0%, rgba(18, 180, 136, 0.10), transparent 55%);
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
