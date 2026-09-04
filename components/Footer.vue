<template>
  <footer class="mt-24 border-t border-border">
    <div class="container-wide py-12">
      <div class="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div class="max-w-sm">
          <NuxtLink to="/" class="flex items-center gap-2.5 font-semibold tracking-tight text-ink no-underline">
            <img src="/logo.png" alt="Adewale Abati logo" class="h-8 w-8 dark:invert" />
            Adewale Abati
          </NuxtLink>
          <p class="mt-3 text-sm leading-relaxed text-ink-faint">
            Web Engineer &amp; Developer Advocate building at the intersection of agentic AI, open source, and community.
          </p>
        </div>

        <div class="grid grid-cols-2 gap-8 sm:grid-cols-3">
          <nav class="flex flex-col gap-2" aria-label="Footer">
            <span class="eyebrow mb-1">Explore</span>
            <NuxtLink v-for="item in nav" :key="item.to" :to="item.to" class="text-sm text-ink-faint no-underline transition-colors hover:text-ink">
              {{ item.label }}
            </NuxtLink>
          </nav>
          <div class="flex flex-col gap-2">
            <span class="eyebrow mb-1">More</span>
            <NuxtLink to="/talks" class="text-sm text-ink-faint no-underline transition-colors hover:text-ink">Speaking</NuxtLink>
            <a href="/rss.xml" class="text-sm text-ink-faint no-underline transition-colors hover:text-ink">RSS Feed</a>
            <a href="https://github.com/acekyd" target="_blank" rel="noopener" class="text-sm text-ink-faint no-underline transition-colors hover:text-ink">Open Source</a>
          </div>
          <div class="col-span-2 flex flex-col gap-2 sm:col-span-1">
            <span class="eyebrow mb-1">Connect</span>
            <SocialLinks size="sm" />
          </div>
        </div>
      </div>

      <div class="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-ink-faint sm:flex-row">
        <p>© {{ year }} Adewale Abati. Built with Nuxt &amp; Three.js.</p>
        <p class="flex items-center gap-1.5">
          <span class="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
          {{ clock }}
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const nav = useAppConfig().nav
const year = new Date().getFullYear()

const clock = ref('')
let timer: ReturnType<typeof setInterval> | undefined

function tick() {
  clock.value = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
}

onMounted(() => {
  tick()
  timer = setInterval(tick, 30_000)
})
onBeforeUnmount(() => timer && clearInterval(timer))
</script>
