<template>
  <div class="container-content py-12 md:py-16">
    <header class="animate-fade-up mb-10">
      <p class="eyebrow mb-3">Writing elsewhere</p>
      <h1 class="pageTitle">Publications</h1>
      <p class="pageSubtitle">Articles, guest posts, and features published across the web.</p>
    </header>

    <div class="rounded-2xl border border-border bg-surface p-8 text-center">
      <p class="text-ink-faint">
        This collection is being curated. In the meantime, find my latest writing on
        <NuxtLink to="/posts" class="text-accent-ink no-underline">the blog</NuxtLink>
        and
        <a href="https://acekyd.substack.com" target="_blank" rel="noopener" class="text-accent-ink no-underline">my newsletter</a>.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({ titleTemplate: 'Publications - Adewale Abati' })
useSeoMeta({
  description: 'Articles, guest posts, and features published by Adewale "Ace" Abati across the web.',
  ogTitle: 'Publications - Adewale Abati',
  ogDescription: 'Articles, guest posts, and features published by Adewale "Ace" Abati across the web.',
  ogUrl: 'https://adewaleabati.com/publications',
})
</script>
