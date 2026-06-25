<template>
  <div class="container-content py-12 md:py-16">
    <header class="animate-fade-up">
      <p class="eyebrow mb-3">Writing</p>
      <h1 class="pageTitle">Blog</h1>
      <p class="pageSubtitle">Thoughts about experiments, technology, careers, and opinions worth arguing over.</p>
    </header>

    <section class="mt-4">
      <ContentList :query="query" v-slot="{ list }">
        <ul class="-mx-3 divide-y divide-border">
          <li v-for="article in list" :key="article._path">
            <NuxtLink
              :to="article._path"
              class="group block rounded-2xl px-3 py-5 no-underline transition-colors hover:bg-surface"
            >
              <div class="flex items-center gap-3 text-xs text-ink-faint">
                <time :datetime="article.date">{{ getDate(article.date) }}</time>
                <span v-if="article.tags?.length" class="flex flex-wrap gap-1.5">
                  <span
                    v-for="tag in article.tags.slice(0, 2)"
                    :key="tag"
                    class="rounded-full border border-border px-2 py-0.5"
                  >{{ tag }}</span>
                </span>
              </div>
              <h2 class="mt-2 text-lg font-semibold text-ink transition-colors group-hover:text-accent">
                {{ article.title }}
              </h2>
              <p class="mt-1.5 line-clamp-2 text-sm leading-relaxed text-ink-faint">
                {{ article.description }}
              </p>
            </NuxtLink>
          </li>
        </ul>
      </ContentList>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { QueryBuilderParams } from '@nuxt/content/dist/runtime/types'
const query: QueryBuilderParams = { path: '/posts', limit: 50, sort: [{ date: -1 }], where: [{ published: { $ne: false } }] }

useHead({
  titleTemplate: 'Blog - Adewale Abati',
})
useSeoMeta({
  description: 'Essays and notes on agentic AI, open source, developer relations, careers, and building on the web — by Adewale "Ace" Abati.',
})
</script>
