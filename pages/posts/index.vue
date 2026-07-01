<template>
  <div class="container-wide py-12 md:py-16">
    <header class="animate-fade-up">
      <p class="eyebrow mb-3">Writing</p>
      <h1 class="pageTitle">Blog</h1>
      <p class="pageSubtitle">
        Notes on agentic AI, open source, developer relations, careers, and building on the web —
        {{ all.length }} posts and counting.
      </p>
    </header>

    <!-- Featured latest post -->
    <SpotlightCard v-if="featured && !activeTag" class="group mt-4">
      <div class="grid md:grid-cols-[1.6fr_0.9fr]">
        <!-- content -->
        <div class="order-2 p-7 md:order-1 md:p-10">
          <div class="flex flex-wrap items-center gap-2.5 text-xs text-ink-faint">
            <span class="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-0.5 font-medium text-accent-ink">
              <span class="h-1.5 w-1.5 rounded-full bg-accent" /> Latest
            </span>
            <span v-if="featured.external" class="inline-flex items-center gap-1 rounded-full border border-border px-2 py-0.5">
              <svg class="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M7 17 17 7M7 7h10v10" /></svg>
              {{ featured.source }}
            </span>
            <span v-for="tag in (featured.tags || []).slice(0, 2)" :key="tag" class="rounded-full border border-border px-2 py-0.5">{{ tag }}</span>
          </div>
          <h2 class="mt-4 font-bold tracking-tight text-ink transition-colors group-hover:text-accent-ink text-[clamp(1.6rem,3.5vw,2.5rem)] leading-[1.08]">
            {{ featured.title }}
          </h2>
          <p class="mt-3 max-w-xl leading-relaxed text-ink-soft">{{ featured.description }}</p>
          <span class="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-ink">
            {{ featured.external ? `Read on ${featured.source}` : 'Read post' }}
            <svg class="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </span>
        </div>

        <!-- cover image when available, else a decorative editorial date panel -->
        <div
          v-if="featured.image"
          class="relative order-1 hidden min-h-[220px] overflow-hidden border-l border-border md:order-2 md:block"
        >
          <img
            :src="featured.image"
            :alt="featured.title"
            loading="lazy"
            class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
        <div v-else class="relative order-1 hidden overflow-hidden border-l border-border bg-gradient-to-br from-accent-soft via-transparent to-transparent md:order-2 md:block">
          <div class="grain absolute inset-0 opacity-50" />
          <div class="relative flex h-full flex-col items-center justify-center p-8 text-center">
            <span class="text-[3.5rem] font-bold uppercase leading-none tracking-tight text-ink">{{ featuredDate.mon }}</span>
            <span class="mt-1 text-2xl font-semibold text-ink-faint">{{ featuredDate.year }}</span>
            <span class="mt-6 grid h-11 w-11 place-items-center rounded-full border border-border bg-bg/60 text-accent-ink backdrop-blur transition-transform duration-300 group-hover:translate-x-1">
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </span>
          </div>
        </div>
      </div>
      <a
        v-if="featured.external"
        :href="featured.external"
        target="_blank"
        rel="noopener"
        class="absolute inset-0 z-20 cursor-pointer"
        :aria-label="`Read: ${featured.title}`"
      />
      <NuxtLink
        v-else
        :to="featured._path"
        class="absolute inset-0 z-20 cursor-pointer"
        :aria-label="`Read: ${featured.title}`"
      />
    </SpotlightCard>

    <!-- Tag filter -->
    <div v-if="tags.length" class="mt-10">
      <div class="flex flex-wrap gap-2">
        <button type="button" class="tagchip" :class="{ 'tagchip--on': !activeTag }" @click="activeTag = null">
          All
        </button>
        <button
          v-for="tag in tags"
          :key="tag"
          type="button"
          class="tagchip"
          :class="{ 'tagchip--on': activeTag === tag }"
          @click="activeTag = activeTag === tag ? null : tag"
        >
          {{ tag }}
        </button>
      </div>
    </div>

    <!-- Post list -->
    <section class="mt-6">
      <ul class="divide-y divide-border">
        <li v-for="article in list" :key="article._path">
          <a
            v-if="article.external"
            :href="article.external"
            target="_blank"
            rel="noopener"
            class="group -mx-4 flex gap-5 rounded-2xl px-4 py-6 no-underline transition-colors hover:bg-surface"
          >
            <div class="min-w-0 flex-1">
              <div class="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-ink-faint">
                <time :datetime="article.date">{{ getDate(article.date) }}</time>
                <span v-if="article.external" class="inline-flex items-center gap-1 text-ink-faint">
                  <svg class="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M7 17 17 7M7 7h10v10" /></svg>
                  {{ article.source }}
                </span>
                <span v-if="article.tags?.length" class="flex flex-wrap gap-1.5">
                  <span v-for="tag in article.tags.slice(0, 3)" :key="tag" class="rounded-full border border-border px-2 py-0.5">{{ tag }}</span>
                </span>
              </div>
              <h3 class="mt-2.5 text-xl font-semibold tracking-tight text-ink transition-colors group-hover:text-accent-ink">
                {{ article.title }}
              </h3>
              <p class="mt-1.5 line-clamp-2 leading-relaxed text-ink-faint">{{ article.description }}</p>
            </div>
            <div v-if="article.image" class="hidden shrink-0 sm:block">
              <img
                :src="article.image"
                :alt="article.title"
                loading="lazy"
                class="h-24 w-36 rounded-xl border border-border object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
          </a>
          <NuxtLink
            v-else
            :to="article._path"
            class="group -mx-4 flex gap-5 rounded-2xl px-4 py-6 no-underline transition-colors hover:bg-surface"
          >
            <div class="min-w-0 flex-1">
              <div class="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-ink-faint">
                <time :datetime="article.date">{{ getDate(article.date) }}</time>
                <span v-if="article.tags?.length" class="flex flex-wrap gap-1.5">
                  <span v-for="tag in article.tags.slice(0, 3)" :key="tag" class="rounded-full border border-border px-2 py-0.5">{{ tag }}</span>
                </span>
              </div>
              <h3 class="mt-2.5 text-xl font-semibold tracking-tight text-ink transition-colors group-hover:text-accent-ink">
                {{ article.title }}
              </h3>
              <p class="mt-1.5 line-clamp-2 leading-relaxed text-ink-faint">{{ article.description }}</p>
            </div>
            <div v-if="article.image" class="hidden shrink-0 sm:block">
              <img
                :src="article.image"
                :alt="article.title"
                loading="lazy"
                class="h-24 w-36 rounded-xl border border-border object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
          </NuxtLink>
        </li>
      </ul>

      <p v-if="!list.length" class="py-12 text-center text-sm text-ink-faint">
        No posts tagged “{{ activeTag }}”.
      </p>
    </section>
  </div>
</template>

<script setup lang="ts">
const { data: posts } = await useAsyncData(
  'blog-index',
  () =>
    queryContent('/posts')
      .where({ published: { $ne: false } })
      .only(['title', 'description', '_path', 'date', 'tags', 'cover_image', 'external_url', 'body'])
      .sort({ date: -1 })
      .find(),
  {
    // Resolve each post's image + external link, and drop the heavy body from the payload.
    transform: (list: any[]) =>
      list.map((p) => ({
        title: p.title,
        description: p.description,
        _path: p._path,
        date: p.date,
        tags: p.tags,
        image: resolveCover(p),
        external: p.external_url || null,
        source: sourceLabel(p.external_url),
      })),
  },
)

function sourceLabel(url?: string): string | null {
  if (!url) return null
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return null
  }
}

const all = computed(() => (posts.value ?? []) as any[])
const featured = computed(() => all.value[0])
const blogTags = [
  'Agentic AI',
  'Open Source',
  'Web Development',
  'Developer Relations',
  'Career',
  'Community',
  'Personal',
  'Technical Writing',
]

const featuredDate = computed(() => {
  const d = featured.value?.date ? new Date(featured.value.date) : null
  if (!d || isNaN(d.getTime())) return { mon: '', year: '' }
  return { mon: d.toLocaleDateString('en-US', { month: 'short' }), year: `${d.getFullYear()}` }
})

const tags = computed(() => {
  const counts = new Map<string, number>()
  all.value.forEach((p) => (p.tags ?? []).forEach((t: string) => counts.set(t, (counts.get(t) ?? 0) + 1)))
  return blogTags.filter((tag) => counts.has(tag))
})

const activeTag = ref<string | null>(null)

const list = computed(() => {
  if (activeTag.value) return all.value.filter((p) => (p.tags ?? []).includes(activeTag.value))
  return all.value.slice(1) // featured is shown separately
})

useHead({ titleTemplate: 'Blog - Adewale Abati' })
useSeoMeta({
  description: 'Essays and notes on agentic AI, open source, developer relations, careers, and building on the web — by Adewale "Ace" Abati.',
})
</script>

<style scoped>
.tagchip {
  @apply rounded-full border border-border px-3.5 py-1.5 text-sm font-medium text-ink-faint transition-colors hover:border-accent/50 hover:text-ink;
}
.tagchip--on {
  @apply border-accent bg-accent text-accent-contrast hover:text-accent-contrast;
}
</style>
