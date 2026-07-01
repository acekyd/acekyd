<template>
  <div class="pcard" :style="perspectiveStyle">
    <!-- soft accent glow grounding the portrait -->
    <div class="pcard__glow" />
    <div
      ref="cardEl"
      class="pcard__inner"
      :style="tiltStyle"
      @pointermove="onMove"
      @pointerleave="reset"
    >
      <img
        :src="src"
        :alt="alt"
        width="520"
        height="520"
        class="pcard__img"
        itemprop="image"
        draggable="false"
      />
      <div class="pcard__ring" />
      <div class="pcard__badge">
        <img src="/logo.png" alt="" class="h-5 w-5" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{ src?: string; alt?: string }>(), {
  src: '/author.jpg',
  alt: "Adewale 'Ace' Abati",
})

const cardEl = ref<HTMLElement | null>(null)
const rx = ref(0)
const ry = ref(0)
const reduced = ref(false)

onMounted(() => {
  reduced.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
})

const perspectiveStyle = 'perspective: 1100px'
const tiltStyle = computed(() =>
  `transform: rotateX(${rx.value}deg) rotateY(${ry.value}deg)`,
)

function onMove(e: PointerEvent) {
  if (reduced.value || !cardEl.value) return
  const r = cardEl.value.getBoundingClientRect()
  const px = (e.clientX - r.left) / r.width - 0.5
  const py = (e.clientY - r.top) / r.height - 0.5
  // gentle, restrained tilt — the photo stays crisp and fully visible
  ry.value = px * 8
  rx.value = -py * 8
}

function reset() {
  rx.value = 0
  ry.value = 0
}
</script>

<style scoped>
.pcard {
  position: relative;
  width: 100%;
  max-width: 420px;
  margin-inline: auto;
}
.pcard__glow {
  position: absolute;
  inset: -12%;
  z-index: -1;
  background: radial-gradient(circle at 50% 42%, var(--accent-soft), transparent 60%);
  filter: blur(36px);
}
.pcard__inner {
  position: relative;
  aspect-ratio: 1 / 1;
  border-radius: 28px;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  transform-style: preserve-3d;
  will-change: transform;
}
.pcard__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 28px;
  border: 1px solid rgb(var(--border));
  box-shadow: var(--shadow);
  display: block;
}
.pcard__ring {
  position: absolute;
  inset: 0;
  border-radius: 28px;
  pointer-events: none;
  box-shadow: inset 0 0 0 1px rgb(var(--ink) / 0.06);
  background: linear-gradient(160deg, rgb(255 255 255 / 0.10), transparent 40%);
}
.pcard__badge {
  position: absolute;
  right: 14px;
  bottom: 14px;
  display: grid;
  place-items: center;
  height: 44px;
  width: 44px;
  border-radius: 14px;
  border: 1px solid rgb(var(--border));
  background: rgb(var(--bg) / 0.72);
  backdrop-filter: blur(8px);
  transform: translateZ(40px);
}
</style>
