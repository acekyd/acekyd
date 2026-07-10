<template>
  <div class="code-frame group relative">
    <button
      type="button"
      class="copy-btn"
      :class="{ 'copy-btn--done': copied }"
      :aria-label="copied ? 'Copied' : 'Copy code to clipboard'"
      @click="copy"
    >
      {{ copied ? 'Copied!' : 'Copy' }}
    </button>
    <pre :class="$props.class"><slot /></pre>
  </div>
</template>

<script setup>
const props = defineProps({
  code: { type: String, default: '' },
  language: { type: String, default: null },
  filename: { type: String, default: null },
  highlights: { type: Array, default: () => [] },
  meta: { type: String, default: null },
  class: { type: String, default: null },
})

const copied = ref(false)
let timer = null

async function copy() {
  try {
    await navigator.clipboard.writeText(props.code)
    copied.value = true
    clearTimeout(timer)
    timer = setTimeout(() => (copied.value = false), 2000)
  } catch {
    /* clipboard unavailable — fail quietly */
  }
}

onBeforeUnmount(() => clearTimeout(timer))
</script>

<style scoped>
.copy-btn {
  position: absolute;
  top: 0.6rem;
  right: 0.6rem;
  z-index: 10;
  padding: 0.25rem 0.7rem;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 9999px;
  border: 1px solid rgb(var(--border));
  background: rgb(var(--bg) / 0.7);
  color: rgb(var(--ink-faint));
  backdrop-filter: blur(4px);
  opacity: 0;
  transition: opacity 0.2s ease, color 0.2s ease;
}
.code-frame:hover .copy-btn,
.copy-btn:focus-visible {
  opacity: 1;
}
.copy-btn:hover {
  color: rgb(var(--ink));
}
.copy-btn--done {
  color: rgb(var(--accent-ink));
  opacity: 1;
}
</style>
