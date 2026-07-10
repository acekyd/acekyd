<template>
  <section v-if="posts?.length" class="mt-12 border-t border-border pt-8">
    <h2 class="text-sm font-semibold uppercase tracking-wide text-ink-faint">Keep reading</h2>
    <ul class="mt-2 divide-y divide-border">
      <li v-for="post in posts" :key="post._path">
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
// Purely presentational — the post page fetches and ranks the related posts.
// (Doing an awaited query in here made this an async child component, which
// broke ContentDoc hydration on direct page loads.)
defineProps<{ posts?: any[] }>()
</script>
