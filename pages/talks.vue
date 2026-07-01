<template>
  <div>
    <!-- ===================== HEADER ===================== -->
    <section class="relative isolate overflow-hidden border-b border-border">
      <ClientOnly>
        <HeroAurora class="absolute inset-0 -z-10" />
      </ClientOnly>

      <div class="container-wide py-16 md:py-20">
        <header class="animate-fade-up max-w-3xl">
          <p class="eyebrow mb-4">Speaking</p>
          <h1 class="text-balance font-bold tracking-[-0.03em] text-ink leading-[0.95] text-[clamp(2.4rem,6vw,4rem)]">
            Talks &amp; Presentations
          </h1>
          <p class="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
            Keynotes, sessions, and mentorship at conferences, meetups, and community
            events — on developer relations, open source, and building with AI.
          </p>
        </header>

        <!-- stat strip -->
        <dl class="mt-10 flex flex-wrap gap-x-12 gap-y-6">
          <div v-for="stat in stats" :key="stat.label" :title="stat.title">
            <dt class="text-3xl font-bold tracking-tight text-ink md:text-4xl">{{ stat.value }}</dt>
            <dd class="mt-1 text-sm text-ink-faint">{{ stat.label }}</dd>
          </div>
        </dl>
      </div>
    </section>

    <div class="container-wide py-14 md:py-20">
      <!-- ===================== WATCH (from YouTube playlist) ===================== -->
      <section class="mb-16">
        <div class="mb-6 flex items-center gap-2">
          <span class="h-1.5 w-1.5 rounded-full bg-accent" />
          <h2 class="text-sm font-semibold uppercase tracking-[0.18em] text-ink-faint">Watch</h2>
        </div>
        <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <a
            v-for="video in featured.videos.slice(0, 3)"
            :key="video.id"
            :href="`https://www.youtube.com/watch?v=${video.id}&list=${playlistId}`"
            target="_blank"
            rel="noopener"
            class="group block overflow-hidden rounded-2xl border border-border bg-surface no-underline transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40"
          >
            <div class="relative aspect-video overflow-hidden bg-muted">
              <img
                :src="`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`"
                :alt="`Watch: ${video.title}`"
                loading="lazy"
                class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span class="absolute inset-0 grid place-items-center">
                <span class="grid h-14 w-14 place-items-center rounded-full bg-bg/85 text-ink shadow-lg backdrop-blur transition-transform duration-300 group-hover:scale-110">
                  <svg class="ml-0.5 h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                </span>
              </span>
            </div>
            <div class="p-5">
              <p v-if="video.source" class="text-xs font-medium uppercase tracking-wide text-ink-faint">{{ video.source }}</p>
              <h3 class="mt-1 font-semibold leading-snug text-ink transition-colors group-hover:text-accent-ink">{{ video.title }}</h3>
            </div>
          </a>
        </div>
        <div class="mt-6">
          <a :href="featured.playlistUrl" target="_blank" rel="noopener" class="btn-ghost">
            See more — {{ featured.playlistCount }} videos on YouTube
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M7 17 17 7M7 7h10v10" /></svg>
          </a>
        </div>
      </section>

      <!-- ===================== TIMELINE ===================== -->
      <section ref="railEl" class="relative">
        <!-- base rail + animated progress -->
        <span class="pointer-events-none absolute bottom-2 top-2 left-[7px] w-px bg-border md:left-[9px]" aria-hidden="true" />
        <span
          class="pointer-events-none absolute top-2 left-[7px] w-px bg-accent md:left-[9px]"
          :style="{ height: progress + '%' }"
          aria-hidden="true"
        />

        <div v-for="group in groupedTalks" :key="group.year" class="mb-4">
          <!-- year marker -->
          <div class="relative mb-7 flex items-baseline gap-4 pl-10 md:pl-16">
            <span class="absolute top-2 left-[7px] h-4 w-4 -translate-x-1/2 rounded-full border-2 border-accent bg-bg md:left-[9px]" aria-hidden="true" />
            <h2 class="text-3xl font-bold tracking-tight text-ink md:text-4xl">{{ group.year }}</h2>
            <span class="text-sm text-ink-faint">{{ group.talks.length }} {{ group.talks.length === 1 ? 'talk' : 'talks' }}</span>
          </div>

          <!-- entries -->
          <article
            v-for="talk in group.talks"
            :key="talk.id"
            v-reveal
            class="group relative pb-9 pl-10 md:pl-16"
          >
            <span class="absolute top-[7px] left-[7px] h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-border ring-4 ring-bg transition-colors group-hover:bg-accent md:left-[9px]" aria-hidden="true" />

            <div class="rounded-2xl border border-transparent p-5 transition-all duration-300 hover:border-border hover:bg-surface">
              <component
                :is="primaryLink(talk) ? 'a' : 'div'"
                :href="primaryLink(talk) || undefined"
                :target="primaryLink(talk) ? '_blank' : undefined"
                :rel="primaryLink(talk) ? 'noopener' : undefined"
                class="block no-underline"
              >
                <h3 class="text-lg font-semibold text-ink transition-colors group-hover:text-accent-ink md:text-xl" v-html="talk.title" />
              </component>

              <div class="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-ink-faint">
                <span class="font-medium text-ink-soft" v-html="talk.event" />
                <span v-if="talk.location" class="flex items-center gap-1.5">
                  <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-5.2-7-11a7 7 0 1 1 14 0c0 5.8-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>
                  {{ talk.location }}
                </span>
                <span v-if="talk.date" class="flex items-center gap-1.5">
                  <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="17" rx="2" /><path d="M3 9h18M8 2v4M16 2v4" /></svg>
                  {{ talk.date }}
                </span>
              </div>

              <details v-if="talk.abstract" class="group/ab mt-3">
                <summary class="inline-flex cursor-pointer list-none items-center gap-1.5 text-sm font-medium text-accent-ink">
                  <svg class="h-4 w-4 transition-transform group-open/ab:rotate-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="m9 6 6 6-6 6" /></svg>
                  Abstract
                </summary>
                <div class="prose prose-sm mt-3 max-w-none text-ink-soft dark:prose-invert" v-html="talk.abstract" />
              </details>

              <div class="mt-4 flex flex-wrap gap-2">
                <a v-if="talk.video" :href="talk.video" target="_blank" rel="noopener" class="chip chip--accent">
                  <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg> Watch
                </a>
                <a v-if="talk.slides" :href="talk.slides" target="_blank" rel="noopener" class="chip">
                  <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="13" rx="2" /><path d="M8 21h8M12 17v4" /></svg> Slides
                </a>
                <a v-if="talk.website" :href="talk.website" target="_blank" rel="noopener" class="chip">
                  <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17 17 7M7 7h10v10" /></svg> Event
                </a>
              </div>
            </div>
          </article>
        </div>
      </section>

      <p class="mt-10 border-t border-border pt-8 text-sm text-ink-faint">
        Want me to speak at your event?
        <a href="https://twitter.com/ace_kyd" target="_blank" rel="noopener" class="link-underline font-medium">Reach out on X</a>
        or <a href="mailto:acekyd01@gmail.com" class="link-underline font-medium">send an email</a>.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import Talks from "assets/data/talks.json";
import featured from "assets/data/featured-videos.json";
import speaking from "assets/data/speaking.json";

const playlistId = featured.playlistUrl.split('list=')[1] || ''

interface Talk {
  id: string;
  title: string;
  date: string;
  event: string;
  location: string;
  slides: string;
  embedLink: string;
  website: string;
  video?: string;
  abstract: string;
}
interface YearGroup {
  year: string;
  talks: Talk[];
}

useHead({ titleTemplate: 'Talks and Presentations - Adewale Abati' })
useSeoMeta({
  description: 'Public speaking engagements, keynotes, and technical presentations by Adewale "Ace" Abati on developer advocacy, AI, and open source.',
})

const all = Talks as Talk[]

const extractYear = (d: string): string => {
  if (!d || !d.trim()) return 'Earlier'
  const m = d.match(/\d{4}/)
  return m ? m[0] : 'Earlier'
}

const groupedTalks = computed((): YearGroup[] => {
  const groups: Record<string, Talk[]> = {}
  all.forEach((t) => {
    const y = extractYear(t.date)
    ;(groups[y] ||= []).push(t)
  })
  Object.values(groups).forEach((g) =>
    g.sort((a, b) => {
      if (!a.date && !b.date) return 0
      if (!a.date) return 1
      if (!b.date) return -1
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    }),
  )
  return Object.entries(groups)
    .map(([year, talks]) => ({ year, talks }))
    .sort((a, b) => {
      if (a.year === 'Earlier') return 1
      if (b.year === 'Earlier') return -1
      return parseInt(b.year) - parseInt(a.year)
    })
})

// ---- stats (authoritative, edit assets/data/speaking.json) ---------------
const stats = computed(() => {
  const since = speaking.speakingSince
  const countryCount = speaking.countries.length
  return [
    {
      value: `${speaking.talksDeliveredOverride ?? all.length}`,
      label: 'Talks delivered',
    },
    {
      value: `${new Date().getFullYear() - since}+`,
      label: `Years speaking (since ${since})`,
    },
    {
      value: `${countryCount}${speaking.includeOnline ? '+' : ''}`,
      label: speaking.includeOnline ? 'Countries + online' : 'Countries',
      title: speaking.countries.join(' · '),
    },
    {
      value: `${featured.playlistCount}`,
      label: 'Videos & appearances',
    },
  ]
})

// ---- helpers -------------------------------------------------------------
function primaryLink(t: Talk) {
  return t.video || t.website || t.slides || ''
}

// ---- scroll-driven rail progress ----------------------------------------
const railEl = ref<HTMLElement | null>(null)
const progress = ref(0)
let ticking = false

function updateProgress() {
  ticking = false
  const el = railEl.value
  if (!el) return
  const r = el.getBoundingClientRect()
  const marker = window.innerHeight * 0.5
  const passed = Math.min(Math.max(marker - r.top, 0), r.height)
  progress.value = r.height > 0 ? (passed / r.height) * 100 : 0
}
function onScroll() {
  if (ticking) return
  ticking = true
  requestAnimationFrame(updateProgress)
}

// ---- reveal-on-scroll directive -----------------------------------------
let io: IntersectionObserver | null = null
function ensureIO() {
  if (io) return io
  io = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('reveal-in'); io!.unobserve(e.target) }
    }),
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  )
  return io
}
const reduceMotion = import.meta.client && window.matchMedia('(prefers-reduced-motion: reduce)').matches
const vReveal = {
  mounted(el: HTMLElement) {
    if (reduceMotion) { el.classList.add('reveal-in'); return }
    el.classList.add('reveal')
    ensureIO().observe(el)
  },
  unmounted(el: HTMLElement) {
    io?.unobserve(el)
  },
}

onMounted(() => {
  updateProgress()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
  io?.disconnect()
})
</script>

<style scoped>
.chip {
  @apply inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs font-medium text-ink-soft no-underline transition-colors hover:border-accent/50 hover:text-accent-ink;
}
.chip--accent {
  @apply border-accent/40 bg-accent-soft text-accent-ink;
}

.reveal {
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
.reveal-in {
  opacity: 1;
  transform: none;
}

details > summary::-webkit-details-marker { display: none; }
</style>
