<template>
  <div>
    <PageHero
      eyebrow="Setup"
      title="Uses"
      description="The tools, software, and hardware I use to build, create, and stay productive."
    >
      <p class="mt-6 text-sm text-ink-faint">Last updated August 2024</p>
    </PageHero>

    <main class="container-wide py-14 md:py-20">
      <section v-for="category in categories" :key="category.title" class="border-t border-border py-10 first:border-t-0 first:pt-0">
        <div class="mb-6 flex items-baseline gap-3">
          <span class="h-1.5 w-1.5 rounded-full bg-accent" />
          <h2 class="text-xl font-semibold text-ink md:text-2xl">{{ category.title }}</h2>
        </div>
        <div class="grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          <article v-for="item in category.items" :key="item.name" class="bg-surface p-5 transition-colors hover:bg-bg">
            <h3 class="text-base font-semibold text-ink">{{ item.name }}</h3>
            <ul class="mt-4 space-y-2 text-sm leading-relaxed text-ink-soft">
              <li v-for="detail in item.details" :key="detail" v-html="detail" />
            </ul>
          </article>
        </div>
      </section>

      <aside class="border-t border-border pt-8 text-sm leading-relaxed text-ink-faint">
        Inspired by <a href="https://uses.tech/" target="_blank" rel="noopener" class="link-underline">uses.tech</a>.
        Tools change over time, so this is a living list rather than a recommendation index.
      </aside>
    </main>
  </div>
</template>

<script setup lang="ts">
const categories = [
  { title: 'Development setup', items: [
    { name: 'Editor', details: ['<strong>Visual Studio Code</strong> for daily development', '<strong>Extensions:</strong> GitLens, Prettier, ESLint, Auto Rename Tag, Live Server'] },
    { name: 'Terminal', details: ['<strong>iTerm2</strong> with Oh My Zsh and Powerlevel10k', 'A fast, calm command-line environment for focused work'] },
    { name: 'Version control', details: ['<strong>Git</strong> and GitHub Desktop for visual diffs', '<strong>gh CLI</strong> for GitHub work in the terminal'] },
  ] },
  { title: 'Development tools', items: [
    { name: 'API testing', details: ['<strong>Postman</strong> for API development and testing', '<strong>Insomnia</strong> as an alternative REST client'] },
    { name: 'Data', details: ['<strong>TablePlus</strong> for database management', '<strong>Redis Insight</strong> for Redis'] },
    { name: 'Design and prototyping', details: ['<strong>Figma</strong> for collaborative UI work', '<strong>Excalidraw</strong> for diagrams and wireframes'] },
  ] },
  { title: 'Content creation', items: [
    { name: 'Recording and streaming', details: ['<strong>OBS Studio</strong> for recording and live streams', '<strong>Loom</strong> for quick walkthroughs'] },
    { name: 'Video editing', details: ['<strong>DaVinci Resolve</strong> for editing', '<strong>ScreenFlow</strong> for recorded presentations'] },
    { name: 'Graphics and images', details: ['<strong>Canva</strong> for quick social graphics', '<strong>CleanShot X</strong> for screenshots and annotations'] },
  ] },
  { title: 'Workflows', items: [
    { name: 'Notes and planning', details: ['<strong>Notion</strong> for knowledge and projects', '<strong>Obsidian</strong> for connected thinking'] },
    { name: 'Communication', details: ['<strong>Slack</strong> and <strong>Discord</strong> for teams and communities', '<strong>Zoom</strong> for calls and webinars'] },
    { name: 'Browser', details: ['<strong>Arc</strong> as a daily driver', '<strong>Chrome</strong> for development and testing', '<strong>Extensions:</strong> 1Password, JSON Viewer, React DevTools'] },
  ] },
  { title: 'Hardware and services', items: [
    { name: 'Computer', details: ['<strong>16-inch MacBook Pro M2 Max</strong>', '64GB RAM and 2TB SSD'] },
    { name: 'Desk and recording', details: ['<strong>LG UltraWide 34-inch</strong>, Magic Keyboard, Magic Mouse', '<strong>Blue Yeti</strong>, Sony WH-1000XM4, Logitech C920'] },
    { name: 'Platforms', details: ['<strong>Netlify</strong>, Vercel, and Railway for deployment', '<strong>Cloudinary</strong>, Google Analytics, and Sentry'] },
  ] },
]

useHead({ titleTemplate: 'Uses - Adewale Abati' })
useSeoMeta({
  description: 'The tools, software, and hardware Adewale "Ace" Abati uses daily to build, create, and stay productive as a Web Engineer and Developer Advocate.',
  ogTitle: 'Uses - Adewale Abati',
  ogDescription: 'The tools, software, and hardware Adewale "Ace" Abati uses daily to build, create, and stay productive as a Web Engineer and Developer Advocate.',
  ogUrl: 'https://adewaleabati.com/uses',
})
</script>
