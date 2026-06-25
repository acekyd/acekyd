<template>
  <div class="container-wide py-12 md:py-16">
    <header class="animate-fade-up">
      <p class="eyebrow mb-3">Building</p>
      <h1 class="pageTitle">Projects &amp; Experiments</h1>
      <p class="pageSubtitle">Community-centered solutions, open source projects, plugins, and assorted experiments.</p>
    </header>

    <!-- Featured -->
    <section v-if="featuredProjects().length" class="mt-4">
      <h2 class="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-ink-faint">
        <span class="h-1.5 w-1.5 rounded-full bg-accent" /> Featured
      </h2>
      <div class="grid gap-4 md:grid-cols-2">
        <article v-for="project in featuredProjects()" :key="`f-${project.id}`" class="card flex flex-col">
          <div class="mb-2 flex items-start justify-between gap-3">
            <h3 class="text-lg font-semibold text-ink" v-html="project.title" />
            <span class="shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium" :class="badgeClass(project.status)">
              {{ statusLabel(project.status) }}
            </span>
          </div>
          <p class="flex-1 text-sm leading-relaxed text-ink-faint" v-html="project.description" />
          <div class="mt-4 flex flex-wrap items-center gap-2 text-xs text-ink-faint">
            <span v-if="project.skills" class="rounded-full border border-border px-2 py-0.5">{{ project.skills }}</span>
            <span v-if="project.impact" class="text-accent">{{ project.impact }}</span>
          </div>
          <div class="mt-4 flex gap-2">
            <a v-if="project.github" :href="project.github" target="_blank" rel="noopener" class="proj-link">
              <font-awesome-icon :icon="['fab', 'github']" /> Code
            </a>
            <a v-if="project.website" :href="project.website" target="_blank" rel="noopener" class="proj-link">
              <font-awesome-icon :icon="['fas', 'external-link-alt']" /> Live
            </a>
          </div>
        </article>
      </div>
    </section>

    <!-- Active & Maintained -->
    <section class="mt-12">
      <h2 class="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-ink-faint">Active &amp; Maintained</h2>
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <article v-for="project in activeProjects()" :key="`a-${project.id}`" class="card flex flex-col">
          <div class="mb-2 flex items-start justify-between gap-3">
            <h3 class="text-base font-semibold text-ink" v-html="project.title" />
            <span class="shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium" :class="badgeClass(project.status)">
              {{ statusLabel(project.status) }}
            </span>
          </div>
          <p class="flex-1 text-sm leading-relaxed text-ink-faint" v-html="project.description" />
          <div class="mt-4 flex gap-2">
            <a v-if="project.github" :href="project.github" target="_blank" rel="noopener" class="proj-link">
              <font-awesome-icon :icon="['fab', 'github']" /> Code
            </a>
            <a v-if="project.website" :href="project.website" target="_blank" rel="noopener" class="proj-link">
              <font-awesome-icon :icon="['fas', 'external-link-alt']" /> Live
            </a>
          </div>
        </article>
      </div>
    </section>

    <!-- Archived -->
    <section class="mt-12">
      <h2 class="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-ink-faint">Archived</h2>
      <p class="mb-5 text-sm text-ink-faint">These served their purpose and now rest here as part of the journey.</p>
      <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <article v-for="project in archivedProjects()" :key="`ar-${project.id}`" class="rounded-2xl border border-border bg-bg p-4 opacity-80 transition-opacity hover:opacity-100">
          <h3 class="text-sm font-semibold text-ink" v-html="project.title" />
          <p class="mt-1.5 text-xs leading-relaxed text-ink-faint" v-html="project.description" />
          <div class="mt-3 flex gap-2">
            <a v-if="project.github" :href="project.github" target="_blank" rel="noopener" class="proj-link text-xs">
              <font-awesome-icon :icon="['fab', 'github']" /> Code
            </a>
            <a v-if="project.website" :href="project.website" target="_blank" rel="noopener" class="proj-link text-xs">
              <font-awesome-icon :icon="['fas', 'external-link-alt']" /> Live
            </a>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import Projects from "assets/data/projects.json";

useHead({ titleTemplate: 'Projects and Experiments - Adewale Abati' })
useSeoMeta({
  description: 'Open source projects, tools, and experiments by Adewale "Ace" Abati — from active community work to archived learning projects.',
})

const featuredProjects = () => (Projects as any[]).filter(p => p.featured === true)
const activeProjects = () => (Projects as any[]).filter(p => (p.status === 'active' || p.status === 'maintained') && !p.featured)
const archivedProjects = () => (Projects as any[]).filter(p => p.status === 'archived')

const statusLabel = (s: string) => ({ active: 'Active', maintained: 'Maintained', archived: 'Archived' } as Record<string, string>)[s] || s
const badgeClass = (s: string) => ({
  active: 'bg-accent-soft text-accent',
  maintained: 'border border-border text-ink-faint',
  archived: 'border border-border text-ink-faint',
} as Record<string, string>)[s] || 'border border-border text-ink-faint'
</script>

<style scoped>
.proj-link {
  @apply inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs font-medium text-ink-soft no-underline transition-colors hover:border-accent/50 hover:text-accent;
}
</style>
