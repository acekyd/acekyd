<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0"
      leave-active-class="transition duration-100 ease-in"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open"
        class="fixed inset-0 z-[100] flex items-start justify-center bg-ink/30 px-4 pt-[12vh] backdrop-blur-sm"
        @click.self="close"
      >
        <div
          class="w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-bg shadow-2xl"
          role="dialog"
          aria-modal="true"
          aria-label="Site search"
        >
          <div class="flex items-center gap-3 border-b border-border px-4">
            <svg class="h-5 w-5 shrink-0 text-ink-faint" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" />
            </svg>
            <input
              ref="inputEl"
              v-model="q"
              type="text"
              placeholder="Search posts, talks, projects…"
              class="w-full bg-transparent py-4 text-ink placeholder:text-ink-faint focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
              @keydown.down.prevent="move(1)"
              @keydown.up.prevent="move(-1)"
              @keydown.enter.prevent="go(results[active])"
              @keydown.esc="close"
            />
            <kbd class="hidden rounded border border-border px-1.5 py-0.5 text-[10px] text-ink-faint sm:inline">ESC</kbd>
          </div>

          <div class="max-h-[55vh] overflow-y-auto p-2">
            <p v-if="!results.length" class="px-3 py-8 text-center text-sm text-ink-faint">
              {{ q ? 'No matches found.' : 'Start typing to search.' }}
            </p>
            <component
              :is="item.href ? 'a' : 'NuxtLink'"
              v-for="(item, i) in results"
              :key="item.key"
              :to="item.href ? undefined : item.to"
              :href="item.href || undefined"
              :target="item.href ? '_blank' : undefined"
              :rel="item.href ? 'noopener' : undefined"
              class="flex items-start gap-3 rounded-xl px-3 py-2.5 no-underline transition-colors"
              :class="i === active ? 'bg-surface' : 'hover:bg-surface'"
              @click="close"
              @mouseenter="active = i"
            >
              <span
                class="mt-0.5 shrink-0 rounded-md border border-border px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-ink-faint"
              >{{ item.kind }}</span>
              <span class="min-w-0 flex-1">
                <span class="block truncate text-sm font-medium text-ink">{{ item.title }}</span>
                <span v-if="item.description" class="block truncate text-xs text-ink-faint">{{ item.description }}</span>
              </span>
              <svg v-if="item.href" class="mt-1 h-3.5 w-3.5 shrink-0 text-ink-faint" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M7 17 17 7M7 7h10v10" /></svg>
            </component>
          </div>

          <div class="flex items-center gap-4 border-t border-border px-4 py-2 text-[11px] text-ink-faint">
            <span><kbd class="font-sans">↑↓</kbd> navigate</span>
            <span><kbd class="font-sans">↵</kbd> open</span>
            <span><kbd class="font-sans">esc</kbd> close</span>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import talksData from 'assets/data/talks.json'
import projectsData from 'assets/data/projects.json'

const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{ 'update:open': [boolean] }>()

const q = ref('')
const active = ref(0)
const inputEl = ref<HTMLInputElement | null>(null)

type Entry = {
  kind: string
  title: string
  description: string
  to?: string
  href?: string
  key: string
  titleLc: string
  hay: string
}

const strip = (s?: string) =>
  (s || '').replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&#39;|&rsquo;/g, "'").replace(/\s+/g, ' ').trim()

const staticEntries: Entry[] = [
  { kind: 'page', title: 'Home', description: 'Intro & highlights', to: '/' },
  { kind: 'page', title: 'Blog', description: 'Articles & essays', to: '/posts' },
  { kind: 'page', title: 'Talks', description: 'Conference & community talks', to: '/talks' },
  { kind: 'page', title: 'Projects', description: 'Open source & experiments', to: '/projects' },
  { kind: 'page', title: 'Publications', description: 'Writing elsewhere', to: '/publications' },
].map((e) => ({ ...e, key: 'page:' + e.to, titleLc: e.title.toLowerCase(), hay: (e.title + ' ' + e.description).toLowerCase() }))

const { data: posts } = await useAsyncData('search-posts', () =>
  queryContent('/posts')
    .where({ published: { $ne: false } })
    .only(['title', 'description', '_path', 'tags', 'external_url'])
    .sort({ date: -1 })
    .find(),
)

const index = computed<Entry[]>(() => {
  const postEntries: Entry[] = (posts.value ?? [])
    .filter((p: any) => p?._path)
    .map((p: any) => {
      const tags = Array.isArray(p.tags) ? p.tags.join(' ') : ''
      const title = strip(p.title) || 'Untitled'
      const description = strip(p.description)
      return {
        kind: 'post',
        title,
        description,
        href: p.external_url || undefined,
        to: p.external_url ? undefined : (p._path as string),
        key: 'post:' + p._path,
        titleLc: title.toLowerCase(),
        hay: (title + ' ' + description + ' ' + tags).toLowerCase(),
      }
    })

  const talkEntries: Entry[] = (talksData as any[]).map((t, i) => {
    const title = strip(t.title)
    const year = (t.date || '').match(/\d{4}/)?.[0] || ''
    const meta = [strip(t.event), t.location, year].filter(Boolean).join(' · ')
    const href = t.video || t.website || t.slides || undefined
    return {
      kind: 'talk',
      title,
      description: meta,
      href,
      to: href ? undefined : '/talks',
      key: 'talk:' + (t.id ?? i),
      titleLc: title.toLowerCase(),
      hay: (title + ' ' + meta + ' ' + strip(t.abstract)).toLowerCase(),
    }
  })

  const projectEntries: Entry[] = (projectsData as any[]).map((p, i) => {
    const title = strip(p.title)
    const description = strip(p.description)
    const meta = [p.skills, p.impact].filter(Boolean).join(' · ')
    const href = p.website || p.github || undefined
    return {
      kind: 'project',
      title,
      description: meta || description,
      href,
      to: href ? undefined : '/projects',
      key: 'project:' + (p.id ?? i),
      titleLc: title.toLowerCase(),
      hay: (title + ' ' + description + ' ' + meta).toLowerCase(),
    }
  })

  return [...staticEntries, ...postEntries, ...talkEntries, ...projectEntries]
})

// ---- tiny dependency-free fuzzy matcher ---------------------------------
function boundedLev(a: string, b: string, max: number): number {
  const al = a.length, bl = b.length
  if (Math.abs(al - bl) > max) return max + 1
  let prev = new Array(bl + 1)
  let curr = new Array(bl + 1)
  for (let j = 0; j <= bl; j++) prev[j] = j
  for (let i = 1; i <= al; i++) {
    curr[0] = i
    let rowMin = curr[0]
    for (let j = 1; j <= bl; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      curr[j] = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + cost)
      if (curr[j] < rowMin) rowMin = curr[j]
    }
    if (rowMin > max) return max + 1
    ;[prev, curr] = [curr, prev]
  }
  return prev[bl]
}

function isSubsequence(q: string, text: string): boolean {
  let i = 0
  for (let j = 0; j < text.length && i < q.length; j++) if (text[j] === q[i]) i++
  return i === q.length
}

// score a query against a lowercase target; 0 = no match, higher = better
function fuzzyScore(query: string, text: string): number {
  if (!query || !text) return 0
  const idx = text.indexOf(query)
  if (idx !== -1) {
    let s = 120 - Math.min(idx, 40)
    if (idx === 0 || /[^a-z0-9]/.test(text[idx - 1] || ' ')) s += 25
    return s
  }
  const qWords = query.split(/\s+/).filter(Boolean)
  const tWords = text.split(/[^a-z0-9]+/).filter(Boolean)
  let total = 0
  for (const qw of qWords) {
    let best = 0
    for (const tw of tWords) {
      if (tw === qw) { best = Math.max(best, 70); break }
      if (tw.includes(qw)) { best = Math.max(best, 55); continue }
      if (tw.startsWith(qw)) { best = Math.max(best, 50); continue }
      const tol = qw.length <= 4 ? 1 : 2
      const d = boundedLev(qw, tw, tol)
      if (d <= tol) best = Math.max(best, 46 - d * 12)
    }
    if (best === 0) {
      if (qw.length >= 3 && isSubsequence(qw, text)) best = 12
      else return 0 // every query word must match something
    }
    total += best
  }
  return total
}

function scoreEntry(term: string, e: Entry): number {
  return fuzzyScore(term, e.titleLc) * 2.2 + fuzzyScore(term, e.hay)
}

const results = computed<Entry[]>(() => {
  const term = q.value.trim().toLowerCase()
  if (!term) return index.value.slice(0, 8)
  return index.value
    .map((e) => ({ e, s: scoreEntry(term, e) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, 12)
    .map((x) => x.e)
})

watch(results, () => (active.value = 0))

function move(dir: number) {
  if (!results.value.length) return
  active.value = (active.value + dir + results.value.length) % results.value.length
}

const router = useRouter()
function go(item?: Entry) {
  if (!item) return
  if (item.href) window.open(item.href, '_blank', 'noopener')
  else if (item.to) router.push(item.to)
  close()
}

function close() {
  emit('update:open', false)
}

watch(
  () => props.open,
  async (isOpen) => {
    if (isOpen) {
      q.value = ''
      active.value = 0
      await nextTick()
      inputEl.value?.focus()
    }
  },
)
</script>
