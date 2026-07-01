<template>
  <div>
    <!-- ===================== HERO ===================== -->
    <section class="relative isolate overflow-hidden">
      <ClientOnly>
        <HeroAurora class="absolute inset-0 -z-10" />
      </ClientOnly>

      <div class="container-wide relative grid min-h-[92vh] items-center gap-12 py-16 md:grid-cols-[1.1fr_0.9fr] md:gap-10">
        <div class="order-2 animate-fade-up md:order-1">
          <p class="eyebrow mb-5 flex items-center gap-2.5">
            <span class="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
            Staff Developer Advocate · Block
          </p>

          <h1 class="font-bold tracking-[-0.02em] text-ink leading-[1.02] text-[clamp(1.9rem,4.4vw,3.25rem)] sm:whitespace-nowrap">
            Adewale <span class="text-accent">“Ace”</span> Abati
          </h1>

          <p class="mt-5 max-w-xl text-xl font-semibold leading-snug text-ink md:text-2xl">
            Helping frontier technical products earn developer trust and adoption.
          </p>

          <div class="mt-5 max-w-xl space-y-4 leading-relaxed text-ink-soft">
            <p>
              Hello! I'm Adewale “Ace” Abati — a Web Engineer, Staff Developer Advocate, GitHub Star,
              and Agentic AI Foundation Ambassador. I help frontier technical products become
              understandable, credible, usable, and adopted by developers.
            </p>
            <p>
              My work sits at the intersection of engineering, developer advocacy, technical
              storytelling, open source, and community education. Over the past few years, I've helped
              developers understand and adopt emerging technologies across coding in the browser, Web5,
              decentralized identity, developer-focused finance infrastructure, and agentic AI.
            </p>
          </div>

          <p class="mt-6 text-sm text-ink-faint">
            Previously
            <a href="https://codesandbox.io/" target="_blank" rel="noopener" class="link-underline">CodeSandbox</a>,
            <a href="https://flutterwave.com/" target="_blank" rel="noopener" class="link-underline">Flutterwave</a>,
            <a href="https://ingressive.org/" target="_blank" rel="noopener" class="link-underline">Ingressive</a>,
            <a href="http://www.withpropel.com/" target="_blank" rel="noopener" class="link-underline">Hirefreehands (Propel)</a>,
            <a href="https://hotels.ng/" target="_blank" rel="noopener" class="link-underline">HotelsNG</a>.
          </p>

          <div class="mt-6 flex flex-wrap items-center gap-3">
            <a href="https://acekyd.substack.com" target="_blank" rel="noopener" class="btn">
              Subscribe on Substack
            </a>
            <NuxtLink to="/posts" class="btn-ghost">Read the blog</NuxtLink>
          </div>

          <div class="mt-8">
            <SocialLinks size="sm" />
          </div>
        </div>

        <!-- Clean portrait — the real photo, crisp and central -->
        <div class="order-1 w-full md:order-2 md:justify-self-end">
          <PortraitCard src="/author.jpg" alt="Adewale 'Ace' Abati" />
        </div>
      </div>

      <!-- scroll cue -->
      <div class="pointer-events-none absolute inset-x-0 bottom-6 hidden justify-center md:flex">
        <span class="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-ink-faint">
          <svg class="h-4 w-4 animate-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M6 13l6 6 6-6" /></svg>
          Scroll
        </span>
      </div>
    </section>

    <!-- ===================== RECENT WRITING ===================== -->
    <section class="container-wide py-12">
      <div class="mb-8 flex items-end justify-between">
        <div>
          <p class="eyebrow mb-2">Writing</p>
          <h2 class="text-3xl font-bold tracking-tight text-ink md:text-4xl">Recent posts</h2>
        </div>
        <NuxtLink to="/posts" class="hidden text-sm font-medium text-accent no-underline hover:opacity-80 sm:inline">
          All posts →
        </NuxtLink>
      </div>

      <div class="grid gap-4 md:grid-cols-2">
        <NuxtLink
          v-for="post in recentPosts"
          :key="post._path"
          :to="post._path"
          class="card card-hover group"
        >
          <div class="flex items-center gap-2 text-xs text-ink-faint">
            <time :datetime="post.date">{{ formatDate(post.date) }}</time>
          </div>
          <h3 class="mt-2 text-lg font-semibold text-ink transition-colors group-hover:text-accent-ink">
            {{ post.title }}
          </h3>
          <p class="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-faint">
            {{ post.description }}
          </p>
        </NuxtLink>
      </div>
      <NuxtLink to="/posts" class="mt-6 inline-block text-sm font-medium text-accent no-underline sm:hidden">
        All posts →
      </NuxtLink>
    </section>

    <!-- ===================== SELECTED PROJECTS ===================== -->
    <section class="container-wide py-12">
      <div class="mb-8 flex items-end justify-between">
        <div>
          <p class="eyebrow mb-2">Building</p>
          <h2 class="text-3xl font-bold tracking-tight text-ink md:text-4xl">Selected projects</h2>
        </div>
        <NuxtLink to="/projects" class="hidden text-sm font-medium text-accent no-underline hover:opacity-80 sm:inline">
          All projects →
        </NuxtLink>
      </div>

      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <a
          v-for="project in featuredProjects"
          :key="project.id"
          :href="project.website || project.github"
          target="_blank"
          rel="noopener"
          class="card card-hover group flex flex-col"
        >
          <div class="flex items-start justify-between gap-3">
            <h3 class="text-base font-semibold text-ink transition-colors group-hover:text-accent-ink" v-html="project.title" />
            <svg class="mt-1 h-4 w-4 shrink-0 text-ink-faint transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <path d="M7 17 17 7M7 7h10v10" />
            </svg>
          </div>
          <p class="mt-2 flex-1 text-sm leading-relaxed text-ink-faint" v-html="project.description" />
          <div class="mt-4 flex flex-wrap items-center gap-2 text-xs text-ink-faint">
            <span v-if="project.skills" class="rounded-full border border-border px-2 py-0.5">{{ project.skills }}</span>
            <span v-if="project.impact" class="text-accent-ink">{{ project.impact }}</span>
          </div>
        </a>
      </div>
    </section>

    <!-- ===================== TALKS + CTA ===================== -->
    <section class="container-wide py-12">
      <div class="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div class="rounded-3xl border border-border bg-surface p-8">
          <p class="eyebrow mb-2">Speaking</p>
          <h2 class="text-2xl font-bold text-ink">On stage &amp; on stream</h2>
          <p class="mt-3 max-w-md text-sm leading-relaxed text-ink-faint">
            I speak and mentor at conferences, meetups, and community events around the world —
            on developer relations, open source, and building with AI.
          </p>
          <NuxtLink to="/talks" class="mt-6 inline-block text-sm font-medium text-accent-ink no-underline">
            Browse talks →
          </NuxtLink>
        </div>

        <div class="flex flex-col justify-between rounded-3xl border border-accent/30 bg-accent-soft p-8">
          <div>
            <h2 class="text-xl font-bold text-ink">Let's keep in touch</h2>
            <p class="mt-3 text-sm leading-relaxed text-ink-soft">
              Practical thoughts on creativity, AI, and engineering — straight to your inbox.
            </p>
          </div>
          <a href="https://acekyd.substack.com" target="_blank" rel="noopener" class="btn mt-6 self-start">
            Subscribe on Substack
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import Projects from 'assets/data/projects.json'

const { data: recentPosts } = await useAsyncData('home-recent-posts', () =>
  queryContent('/posts')
    .where({ published: { $ne: false } })
    .only(['title', 'description', '_path', 'date'])
    .sort({ date: -1 })
    .limit(4)
    .find(),
)

const featuredProjects = (Projects as any[])
  .filter((p) => p.featured === true || p.status === 'active')
  .slice(0, 6)

function formatDate(date?: string) {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

useHead({
  titleTemplate: 'Adewale Abati - Web Engineer & Developer Advocate',
})
useSeoMeta({
  description:
    'Adewale "Ace" Abati — Web Engineer and Staff Developer Advocate at Block. Writing, talks, and projects on agentic AI, open source, and developer community.',
})
</script>
