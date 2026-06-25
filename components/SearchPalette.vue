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
              class="w-full bg-transparent py-4 text-ink placeholder:text-ink-faint focus:outline-none"
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
            <NuxtLink
              v-for="(item, i) in results"
              :key="item.to"
              :to="item.to"
              class="flex items-start gap-3 rounded-xl px-3 py-2.5 no-underline transition-colors"
              :class="i === active ? 'bg-surface' : 'hover:bg-surface'"
              @click="close"
              @mouseenter="active = i"
            >
              <span
                class="mt-0.5 shrink-0 rounded-md border border-border px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-ink-faint"
              >{{ item.kind }}</span>
              <span class="min-w-0">
                <span class="block truncate text-sm font-medium text-ink">{{ item.title }}</span>
                <span v-if="item.description" class="block truncate text-xs text-ink-faint">{{ item.description }}</span>
              </span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{ 'update:open': [boolean] }>()

const q = ref('')
const active = ref(0)
const inputEl = ref<HTMLInputElement | null>(null)

// Static entries (pages) + dynamic blog posts.
const staticEntries = [
  { kind: 'page', title: 'Home', description: 'Intro & highlights', to: '/' },
  { kind: 'page', title: 'Blog', description: 'Articles & essays', to: '/posts' },
  { kind: 'page', title: 'Talks', description: 'Conference & community talks', to: '/talks' },
  { kind: 'page', title: 'Projects', description: 'Open source & experiments', to: '/projects' },
]

const { data: posts } = await useAsyncData('search-posts', () =>
  queryContent('/posts')
    .where({ published: { $ne: false } })
    .only(['title', 'description', '_path'])
    .find(),
)

const index = computed(() => [
  ...staticEntries,
  ...((posts.value ?? []).map((p: any) => ({
    kind: 'post',
    title: p.title ?? 'Untitled',
    description: p.description ?? '',
    to: p._path,
  }))),
])

const results = computed(() => {
  const term = q.value.trim().toLowerCase()
  if (!term) return index.value.slice(0, 8)
  return index.value
    .filter((e) =>
      (e.title + ' ' + (e.description ?? '')).toLowerCase().includes(term),
    )
    .slice(0, 12)
})

watch(results, () => (active.value = 0))

function move(dir: number) {
  if (!results.value.length) return
  active.value = (active.value + dir + results.value.length) % results.value.length
}

const router = useRouter()
function go(item?: { to: string }) {
  if (!item) return
  router.push(item.to)
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
