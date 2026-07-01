<template>
  <div class="container-wide py-12 md:py-16">
    <header class="animate-fade-up">
      <p class="eyebrow mb-3">Building</p>
      <h1 class="pageTitle">Projects &amp; Experiments</h1>
      <p class="pageSubtitle">Community-centered solutions, open source projects, plugins, and assorted experiments.</p>
    </header>

    <!-- Featured -->
    <section v-if="featured.length" class="mt-4">
      <h2 class="section-label"><span class="dot" /> Featured</h2>
      <div class="grid gap-5">
        <!-- each featured project is a full-width horizontal card with an impact panel -->
        <SpotlightCard v-for="(project, i) in featured" :key="`f-${project.id}`" class="group">
          <div class="grid md:grid-cols-[1.55fr_1fr]">
            <div class="flex flex-col p-7 md:p-9">
              <div class="mb-3 flex items-start justify-between gap-3">
                <h3
                  class="font-bold tracking-tight text-ink transition-colors group-hover:text-accent-ink"
                  :class="i === 0 ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'"
                  v-html="project.title"
                />
                <span class="badge" :class="badgeClass(project.status)">{{ statusLabel(project.status) }}</span>
              </div>
              <p class="flex-1 leading-relaxed text-ink-soft md:max-w-xl" :class="i === 0 ? 'text-base' : 'text-sm'" v-html="project.description" />
              <div class="mt-5 flex flex-wrap gap-1.5">
                <span v-for="skill in skillList(project.skills)" :key="skill" class="techchip">{{ skill }}</span>
              </div>
              <div class="mt-6 flex gap-2">
                <a v-if="project.github" :href="project.github" target="_blank" rel="noopener" class="plink">
                  <font-awesome-icon :icon="['fab', 'github']" /> Code
                </a>
                <a v-if="project.website" :href="project.website" target="_blank" rel="noopener" class="plink plink--accent">
                  <font-awesome-icon :icon="['fas', 'external-link-alt']" /> Live
                </a>
              </div>
            </div>

            <!-- decorative impact panel -->
            <div class="relative hidden overflow-hidden border-l border-border bg-gradient-to-br from-accent-soft via-transparent to-transparent md:flex md:flex-col md:items-center md:justify-center md:p-8 md:text-center">
              <div class="grain absolute inset-0 opacity-40" />
              <div class="relative">
                <template v-if="impactStat(project.impact)">
                  <div class="font-bold leading-none tracking-tight text-ink" :class="i === 0 ? 'text-[3.25rem]' : 'text-[2.75rem]'">{{ impactStat(project.impact)!.num }}</div>
                  <div class="mt-2 text-sm text-ink-faint">{{ impactStat(project.impact)!.label }}</div>
                </template>
                <div v-else class="text-6xl font-bold text-accent-ink">✦</div>
              </div>
            </div>
          </div>
        </SpotlightCard>
      </div>
    </section>

    <!-- Active & Maintained -->
    <section v-if="active.length" class="mt-14">
      <h2 class="section-label">Active &amp; Maintained</h2>
      <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <SpotlightCard v-for="project in active" :key="`a-${project.id}`" class="group">
          <div class="flex h-full flex-col p-6">
            <div class="mb-2 flex items-start justify-between gap-3">
              <h3 class="text-base font-semibold text-ink transition-colors group-hover:text-accent-ink" v-html="project.title" />
              <span class="badge" :class="badgeClass(project.status)">{{ statusLabel(project.status) }}</span>
            </div>
            <p class="flex-1 text-sm leading-relaxed text-ink-faint" v-html="project.description" />
            <div v-if="project.impact" class="mt-3 text-xs font-medium text-accent-ink">{{ project.impact }}</div>
            <div class="mt-3 flex flex-wrap gap-1.5">
              <span v-for="skill in skillList(project.skills)" :key="skill" class="techchip">{{ skill }}</span>
            </div>
            <div class="mt-4 flex gap-2">
              <a v-if="project.github" :href="project.github" target="_blank" rel="noopener" class="plink">
                <font-awesome-icon :icon="['fab', 'github']" /> Code
              </a>
              <a v-if="project.website" :href="project.website" target="_blank" rel="noopener" class="plink plink--accent">
                <font-awesome-icon :icon="['fas', 'external-link-alt']" /> Live
              </a>
            </div>
          </div>
        </SpotlightCard>
      </div>
    </section>

    <!-- Archived -->
    <section v-if="archived.length" class="mt-14">
      <h2 class="section-label">Archived</h2>
      <p class="-mt-3 mb-5 text-sm text-ink-faint">Served their purpose and now rest here as part of the journey.</p>
      <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <a
          v-for="project in archived"
          :key="`ar-${project.id}`"
          :href="project.website || project.github || '#'"
          :target="project.website || project.github ? '_blank' : undefined"
          rel="noopener"
          class="group flex items-start justify-between gap-3 rounded-xl border border-border bg-bg p-4 no-underline opacity-80 transition-all hover:opacity-100 hover:border-accent/30"
        >
          <div class="min-w-0">
            <div class="flex flex-wrap items-start gap-2">
              <h3 class="text-sm font-semibold text-ink transition-colors group-hover:text-accent-ink" v-html="project.title" />
              <span class="badge" :class="badgeClass(project.status)">{{ statusLabel(project.status) }}</span>
            </div>
            <p class="mt-1 line-clamp-2 text-xs leading-relaxed text-ink-faint" v-html="project.description" />
            <div v-if="project.impact" class="mt-2 text-xs font-medium text-accent-ink">{{ project.impact }}</div>
            <div class="mt-2 flex flex-wrap gap-1.5">
              <span v-for="skill in skillList(project.skills)" :key="skill" class="techchip">{{ skill }}</span>
            </div>
          </div>
          <svg class="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink-faint transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M7 17 17 7M7 7h10v10" /></svg>
        </a>
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

const data = Projects as any[]
const isArchived = (p: any) => p.status === 'archived'
const featured = data.filter((p) => p.featured === true && !isArchived(p))
const active = data.filter((p) => (p.status === 'active' || p.status === 'maintained') && !p.featured)
const archived = data.filter(isArchived)

const skillList = (s?: string) => (s ? s.split(',').map((x) => x.trim()).filter(Boolean) : [])
// Split an impact string like "25,000+ downloads" into a big number + label.
const impactStat = (s?: string) => {
  if (!s) return null
  const m = s.match(/^\s*([\d.,]+\s*[+%kKmM]*)\s+(.*)$/)
  return m ? { num: m[1].replace(/\s+/g, ''), label: m[2] } : { num: '', label: s }
}
const statusLabel = (s: string) => ({ active: 'Active', maintained: 'Maintained', archived: 'Archived' } as Record<string, string>)[s] || s
const badgeClass = (s: string) =>
  ({
    active: 'bg-accent-soft text-accent-ink',
    maintained: 'border border-border text-ink-faint',
    archived: 'border border-border text-ink-faint',
  } as Record<string, string>)[s] || 'border border-border text-ink-faint'
</script>

<style scoped>
.section-label {
  @apply mb-6 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-ink-faint;
}
.dot { @apply h-1.5 w-1.5 rounded-full bg-accent; }

.badge {
  @apply shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-medium;
}

.techchip {
  @apply rounded-full border border-border px-2.5 py-0.5 text-xs text-ink-faint;
}

.plink {
  @apply inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs font-medium text-ink-soft no-underline transition-colors hover:border-accent/50 hover:text-accent-ink;
}
.plink--accent {
  @apply border-accent/40 bg-accent-soft text-accent-ink;
}
</style>
