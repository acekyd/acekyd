<template>
  <div ref="el" class="spot" @pointermove="onMove" @pointerleave="onLeave">
    <div class="spot__glow" aria-hidden="true" />
    <div class="spot__edge" aria-hidden="true" />
    <div class="relative h-full">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const el = ref<HTMLElement | null>(null)

function onMove(e: PointerEvent) {
  const node = el.value
  if (!node) return
  const r = node.getBoundingClientRect()
  node.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`)
  node.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`)
  node.style.setProperty('--spot', '1')
}
function onLeave() {
  el.value?.style.setProperty('--spot', '0')
}
</script>

<style scoped>
.spot {
  position: relative;
  overflow: hidden;
  border-radius: 24px;
  border: 1px solid rgb(var(--border));
  background: rgb(var(--surface));
  transition: border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
}
.spot:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow);
}
/* soft accent glow that follows the cursor */
.spot__glow {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: var(--spot, 0);
  transition: opacity 0.35s ease;
  background: radial-gradient(440px circle at var(--mx, 50%) var(--my, 50%), var(--accent-soft), transparent 60%);
}
/* a brighter accent ring picked out around the cursor */
.spot__edge {
  position: absolute;
  inset: 0;
  pointer-events: none;
  border-radius: inherit;
  opacity: var(--spot, 0);
  transition: opacity 0.35s ease;
  background: radial-gradient(240px circle at var(--mx, 50%) var(--my, 50%), rgb(var(--accent) / 0.35), transparent 45%);
  -webkit-mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  padding: 1px;
}
@media (prefers-reduced-motion: reduce) {
  .spot:hover { transform: none; }
}
</style>
