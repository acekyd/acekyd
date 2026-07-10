<template>
  <section v-if="related.length" class="mt-12 border-t border-border pt-8">
    <h2 class="text-sm font-semibold uppercase tracking-wide text-ink-faint">Keep reading</h2>
    <ul class="mt-2 divide-y divide-border">
      <li v-for="post in related" :key="post._path">
        <NuxtLink
          :to="post._path"
          class="group -mx-4 block rounded-2xl px-4 py-5 no-underline transition-colors hover:bg-surface"
        >
          <div class="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-ink-faint">
            <time :datetime="post.date">{{ getDate(post.date) }}</time>
            <span v-if="post.tags?.length" class="flex flex-wrap gap-1.5">
              <span v-for="tag in post.tags.slice(0, 2)" :key="tag" class="rounded-full border border-border px-2 py-0.5">{{ tag }}</span>
            </span>
          </div>
          <h3 class="mt-2 text-lg font-semibold tracking-tight text-ink transition-colors group-hover:text-accent-ink">
            {{ post.title }}
          </h3>
          <p class="mt-1 line-clamp-2 text-sm leading-relaxed text-ink-faint">{{ post.description }}</p>
        </NuxtLink>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{ currentPath: string; tags?: string[] }>()

const { data } = await useAsyncData(`related-${props.currentPath}`, () =>
  queryContent('/posts')
    .where({ published: { $ne: false } })
    .only(['title', 'description', '_path', 'date', 'tags', 'external_url'])
    .sort({ date: -1 })
    .find(),
)

// Rank by shared-tag count, then recency; fill with latest posts if fewer
// than 3 share a tag. External stubs are excluded — they redirect off-site.
const related = computed(() => {
  const mine = new Set(props.tags ?? [])
  const candidates = ((data.value ?? []) as any[])
    .filter((p) => p._path !== props.currentPath && !p.external_url)
    .map((p) => ({ ...p, score: (p.tags ?? []).filter((t: string) => mine.has(t)).length }))
  const byTag = candidates
    .filter((p) => p.score > 0)
    .sort((a, b) => b.score - a.score || +new Date(b.date) - +new Date(a.date))
  const fill = candidates.filter((p) => p.score === 0)
  return [...byTag, ...fill].slice(0, 3)
})
</script>
