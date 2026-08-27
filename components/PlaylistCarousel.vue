<template>
  <section
    class="playlist-carousel"
    role="region"
    aria-roledescription="carousel"
    aria-label="Video playlist"
    tabindex="0"
    @keydown.left.prevent="goPrevious"
    @keydown.right.prevent="goNext"
  >
    <div ref="playerHost" class="playlist-player-host" aria-hidden="true" />

    <div
      v-if="videos.length"
      class="carousel-stage"
      :class="{ 'is-dragging': dragging }"
      :style="stageStyle"
      @pointerdown="startDrag"
      @pointermove="moveDrag"
      @pointerup="endDrag"
      @pointercancel="cancelDrag"
      @wheel.capture="onWheel"
    >
      <div
        v-for="card in visibleCards"
        :key="card.video.id"
        class="video-card"
        :class="{
          'video-card--active': card.index === activeIndex,
          'video-card--playing': playingVideoId === card.video.id,
        }"
        :data-position="card.position"
        :style="cardStyle(card.position)"
        :aria-current="card.index === activeIndex ? 'true' : undefined"
      >
        <iframe
          v-if="card.index === activeIndex && playingVideoId === card.video.id"
          class="video-player"
          :src="embedUrl(card.video.id)"
          :title="`Playing: ${card.video.title}`"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        />
        <button
          v-else
          type="button"
          class="video-card-action"
          draggable="false"
          :aria-label="card.index === activeIndex ? `Play ${card.video.title}` : `Show ${card.video.title}`"
          :tabindex="card.index === activeIndex ? 0 : -1"
          @click="activateCard($event, card.index, card.video.id)"
          @dragstart.prevent
        >
          <img
            :src="thumbnailUrl(card.video)"
            :alt="card.video.title"
            loading="lazy"
            decoding="async"
            draggable="false"
            @load="validateThumbnail($event, card.video)"
            @error="useFallbackThumbnail($event, card.video)"
          />
          <span v-if="card.index === activeIndex" class="play-button" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      </div>
    </div>

    <div v-else-if="!loadError" class="carousel-skeleton" :style="stageStyle" aria-label="Loading playlist">
      <span class="skeleton-card skeleton-card--left" />
      <span class="skeleton-card skeleton-card--center" />
      <span class="skeleton-card skeleton-card--right" />
    </div>

    <div v-if="activeVideo" class="carousel-details">
      <div class="video-copy" aria-live="polite" aria-atomic="true">
        <p class="video-source">{{ activeVideo.source }}</p>
        <h3>{{ activeVideo.title }}</h3>
      </div>

      <div class="carousel-actions">
        <span class="carousel-count" aria-label="Playlist position">
          {{ paddedIndex }} <span>/</span> {{ paddedTotal }}
        </span>
        <div class="arrow-controls" aria-label="Carousel controls">
          <button type="button" aria-label="Previous video" @click="goPrevious">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <button type="button" aria-label="Next video" @click="goNext">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
        <a :href="playlistUrl" target="_blank" rel="noopener" class="playlist-link">
          View playlist
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M7 17 17 7M7 7h10v10" />
          </svg>
        </a>
      </div>

      <div class="carousel-progress" aria-hidden="true">
        <span :style="{ width: `${progress}%` }" />
      </div>
    </div>

    <div v-else-if="loadError" class="carousel-error">
      <p>The playlist could not be loaded.</p>
      <a :href="playlistUrl" target="_blank" rel="noopener" class="playlist-link">
        View playlist
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="M7 17 17 7M7 7h10v10" />
        </svg>
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
interface PlaylistVideo {
  id: string
  title: string
  source: string
  thumbnailUrl?: string
}

interface YouTubePlayer {
  cuePlaylist(options: { listType: 'playlist'; list: string; index: number }): void
  destroy(): void
  getPlaylist(): string[] | undefined
}

interface YouTubePlayerEvent {
  target: YouTubePlayer
}

interface YouTubeNamespace {
  Player: new (
    element: HTMLElement,
    options: {
      height: string
      width: string
      playerVars: Record<string, string | number>
      events: {
        onReady: (event: YouTubePlayerEvent) => void
        onStateChange: (event: YouTubePlayerEvent) => void
        onError: () => void
      }
    },
  ) => YouTubePlayer
}

interface OEmbedResponse {
  title?: string
  author_name?: string
  thumbnail_url?: string
}

interface CachedMetadata {
  title: string
  source: string
  thumbnailUrl?: string
  cachedAt: number
}

declare global {
  interface Window {
    YT?: YouTubeNamespace
    onYouTubeIframeAPIReady?: () => void
  }
}

const props = defineProps<{
  playlistUrl: string
}>()

const emit = defineEmits<{
  count: [value: number]
}>()

const playerHost = ref<HTMLElement | null>(null)
const videos = ref<PlaylistVideo[]>([])
const activeIndex = ref(0)
const loadError = ref(false)
const dragging = ref(false)
const dragOffset = ref(0)
const viewportWidth = ref(0)
const playingVideoId = ref<string | null>(null)

let player: YouTubePlayer | null = null
let dragStart = 0
let dragStartY = 0
let dragPointerId: number | null = null
let dragStage: HTMLElement | null = null
let potentialDrag = false
let dragDistance = 0
let ignoreClick = false
let playlistPoll: ReturnType<typeof setTimeout> | null = null
let wheelReset: ReturnType<typeof setTimeout> | null = null
let movementTimer: ReturnType<typeof setTimeout> | null = null
let wheelDistance = 0
let queuedMovement = 0

const cacheKey = 'acekyd-youtube-metadata-v2'
const cacheMaxAge = 1000 * 60 * 60 * 24 * 7

const playlistId = computed(() => {
  try {
    return new URL(props.playlistUrl).searchParams.get('list') || ''
  } catch {
    return ''
  }
})

const activeVideo = computed(() => videos.value[activeIndex.value])
const paddedIndex = computed(() => String(activeIndex.value + 1).padStart(2, '0'))
const paddedTotal = computed(() => String(videos.value.length).padStart(2, '0'))
const progress = computed(() => ((activeIndex.value + 1) / videos.value.length) * 100)
const dragStepWidth = computed(() => Math.max(72, Math.min(140, viewportWidth.value * 0.13)))
const dragProgress = computed(() => dragging.value ? dragOffset.value / dragStepWidth.value : 0)
const visibleCards = computed(() => videos.value
  .map((video, index) => ({ video, index, position: relativeIndex(index) }))
  .filter((card) => Math.abs(card.position + dragProgress.value) <= 3.05))
const stageStyle = computed(() => ({
  width: viewportWidth.value ? `${viewportWidth.value}px` : '100%',
  left: viewportWidth.value ? '50%' : '0',
  marginLeft: viewportWidth.value ? `${viewportWidth.value / -2}px` : '0',
}))

function updateViewportWidth() {
  viewportWidth.value = document.documentElement.clientWidth
}

function interpolate(start: number, end: number, progress: number) {
  return start + (end - start) * progress
}

function cardStyle(position: number) {
  const effectivePosition = position + dragProgress.value
  const direction = Math.sign(effectivePosition)
  const distance = Math.min(Math.abs(effectivePosition), 3)
  const lower = Math.floor(distance)
  const upper = Math.min(lower + 1, 3)
  const amount = distance - lower
  const mobile = viewportWidth.value <= 767
  const x = mobile
    ? [0, viewportWidth.value * 0.66, viewportWidth.value * 1.05, viewportWidth.value * 1.28]
    : [
        0,
        Math.max(224, Math.min(368, viewportWidth.value * 0.31)),
        Math.max(384, Math.min(640, viewportWidth.value * 0.53)),
        Math.max(520, Math.min(860, viewportWidth.value * 0.72)),
      ]
  const y = mobile ? [0, 32, 55, 68] : [0, 44, 80, 100]
  const scale = mobile ? [1, 0.74, 0.55, 0.44] : [1, 0.78, 0.58, 0.45]
  const rotation = [0, 13, 20, 24]
  const opacity = mobile ? [1, 1, 0, 0] : [1, 1, 0.74, 0]
  const saturation = [1, 0.82, 0.6, 0.5]

  return {
    '--carousel-x': `${direction * interpolate(x[lower], x[upper], amount)}px`,
    '--carousel-y': `${interpolate(y[lower], y[upper], amount)}px`,
    '--carousel-scale': interpolate(scale[lower], scale[upper], amount),
    '--carousel-rotate': `${direction * -interpolate(rotation[lower], rotation[upper], amount)}deg`,
    opacity: interpolate(opacity[lower], opacity[upper], amount),
    filter: `saturate(${interpolate(saturation[lower], saturation[upper], amount)})`,
    zIndex: String(Math.max(1, 10 - Math.round(distance * 2))),
  }
}

function loadYouTubeApi(): Promise<YouTubeNamespace> {
  if (window.YT?.Player) return Promise.resolve(window.YT)

  return new Promise((resolve, reject) => {
    const previousCallback = window.onYouTubeIframeAPIReady
    const timeout = window.setTimeout(() => reject(new Error('YouTube API timed out')), 12000)

    window.onYouTubeIframeAPIReady = () => {
      previousCallback?.()
      window.clearTimeout(timeout)
      if (window.YT?.Player) resolve(window.YT)
      else reject(new Error('YouTube API unavailable'))
    }

    if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      const script = document.createElement('script')
      script.src = 'https://www.youtube.com/iframe_api'
      script.async = true
      script.onerror = () => {
        window.clearTimeout(timeout)
        reject(new Error('YouTube API failed to load'))
      }
      document.head.appendChild(script)
    }
  })
}

function collectPlaylist(attempt = 0) {
  const ids = player?.getPlaylist()?.filter(Boolean) || []
  if (ids.length) {
    const uniqueIds = [...new Set(ids)]
    videos.value = uniqueIds.map((id, index) => ({
      id,
      title: `Video ${String(index + 1).padStart(2, '0')}`,
      source: 'YouTube',
    }))
    emit('count', uniqueIds.length)
    hydrateMetadata()
    return
  }

  if (attempt >= 20) {
    loadError.value = true
    return
  }

  playlistPoll = setTimeout(() => collectPlaylist(attempt + 1), 250)
}

function createPlayer(yt: YouTubeNamespace) {
  if (!playerHost.value || !playlistId.value) {
    loadError.value = true
    return
  }

  player = new yt.Player(playerHost.value, {
    height: '1',
    width: '1',
    playerVars: {
      listType: 'playlist',
      list: playlistId.value,
      controls: 0,
      playsinline: 1,
    },
    events: {
      onReady(event) {
        event.target.cuePlaylist({ listType: 'playlist', list: playlistId.value, index: 0 })
        collectPlaylist()
      },
      onStateChange() {
        if (!videos.value.length) collectPlaylist()
      },
      onError() {
        if (!videos.value.length) loadError.value = true
      },
    },
  })
}

function readMetadataCache(): Record<string, CachedMetadata> {
  try {
    const stored = JSON.parse(localStorage.getItem(cacheKey) || '{}') as Record<string, CachedMetadata>
    const now = Date.now()
    return Object.fromEntries(
      Object.entries(stored).filter(([, item]) => now - item.cachedAt < cacheMaxAge),
    )
  } catch {
    return {}
  }
}

function writeMetadataCache(cache: Record<string, CachedMetadata>) {
  try {
    localStorage.setItem(cacheKey, JSON.stringify(cache))
  } catch {
    // The carousel still works when storage is unavailable.
  }
}

async function fetchMetadata(video: PlaylistVideo, cache: Record<string, CachedMetadata>) {
  const cached = cache[video.id]
  if (cached) {
    video.title = cached.title
    video.source = cached.source
    video.thumbnailUrl = cached.thumbnailUrl
    return
  }

  const watchUrl = `https://www.youtube.com/watch?v=${video.id}`
  const endpoint = `https://www.youtube.com/oembed?url=${encodeURIComponent(watchUrl)}&format=json`

  try {
    const response = await fetch(endpoint)
    if (!response.ok) return
    const metadata = await response.json() as OEmbedResponse
    if (!metadata.title) return

    video.title = metadata.title
    video.source = metadata.author_name || 'YouTube'
    video.thumbnailUrl = metadata.thumbnail_url
    cache[video.id] = {
      title: video.title,
      source: video.source,
      thumbnailUrl: video.thumbnailUrl,
      cachedAt: Date.now(),
    }
    writeMetadataCache(cache)
  } catch {
    // Keep the functional fallback label when metadata is unavailable.
  }
}

async function hydrateMetadata() {
  const cache = readMetadataCache()
  const total = videos.value.length
  const priority = [0, 1, total - 1, 2, total - 2]
  const queue = [...new Set([...priority, ...videos.value.map((_, index) => index)])]
    .filter((index) => index >= 0 && index < total)

  const workers = Array.from({ length: Math.min(4, queue.length) }, async () => {
    while (queue.length) {
      const index = queue.shift()
      if (index === undefined) return
      await fetchMetadata(videos.value[index], cache)
    }
  })

  await Promise.all(workers)
}

function relativeIndex(index: number) {
  const total = videos.value.length
  let distance = index - activeIndex.value
  if (distance > total / 2) distance -= total
  if (distance < -total / 2) distance += total
  return distance
}

function goPrevious() {
  clearMovementQueue()
  moveBy(-1)
}

function goNext() {
  clearMovementQueue()
  moveBy(1)
}

function moveBy(distance: number) {
  if (!videos.value.length || !distance) return
  const total = videos.value.length
  activeIndex.value = (activeIndex.value + distance % total + total) % total
}

function queueMove(distance: number) {
  if (!videos.value.length || !distance) return
  const limit = Math.max(videos.value.length - 1, 1)
  queuedMovement = Math.max(-limit, Math.min(limit, queuedMovement + distance))
  if (!movementTimer) flushMovementQueue()
}

function flushMovementQueue() {
  if (!queuedMovement) {
    movementTimer = null
    return
  }

  const direction = Math.sign(queuedMovement)
  queuedMovement -= direction
  moveBy(direction)
  movementTimer = setTimeout(() => {
    movementTimer = null
    flushMovementQueue()
  }, 115)
}

function clearMovementQueue() {
  queuedMovement = 0
  if (movementTimer) clearTimeout(movementTimer)
  movementTimer = null
}

function activateCard(event: MouseEvent, index: number, videoId: string) {
  if (ignoreClick) {
    event.preventDefault()
    return
  }

  if (index !== activeIndex.value) {
    clearMovementQueue()
    activeIndex.value = index
    return
  }

  playingVideoId.value = videoId
}

function startDrag(event: PointerEvent) {
  if (event.button !== 0 || !event.isPrimary) return
  potentialDrag = true
  dragging.value = false
  dragStart = event.clientX
  dragStartY = event.clientY
  dragPointerId = event.pointerId
  dragStage = event.currentTarget as HTMLElement
  dragDistance = 0
  dragOffset.value = 0
}

function moveDrag(event: PointerEvent) {
  if (!potentialDrag || event.pointerId !== dragPointerId) return
  const distanceX = event.clientX - dragStart
  const distanceY = event.clientY - dragStartY

  if (!dragging.value) {
    if (Math.abs(distanceY) >= 7 && Math.abs(distanceY) > Math.abs(distanceX)) {
      cancelDrag()
      return
    }
    if (Math.abs(distanceX) < 7) return

    dragging.value = true
    dragStage?.setPointerCapture(event.pointerId)
  }

  event.preventDefault()
  dragDistance = distanceX
  dragOffset.value = distanceX
}

function endDrag(event: PointerEvent) {
  if (!potentialDrag || event.pointerId !== dragPointerId) return
  const completedDrag = dragging.value && Math.abs(dragDistance) > 8

  if (completedDrag) {
    event.preventDefault()
    ignoreClick = true
    const steps = Math.max(1, Math.round(Math.abs(dragDistance) / dragStepWidth.value))
    clearMovementQueue()
    moveBy(dragDistance < 0 ? steps : -steps)
  }

  if (dragStage?.hasPointerCapture(event.pointerId)) {
    dragStage.releasePointerCapture(event.pointerId)
  }

  potentialDrag = false
  dragging.value = false
  dragDistance = 0
  dragOffset.value = 0
  dragPointerId = null
  dragStage = null
  window.setTimeout(() => { ignoreClick = false }, completedDrag ? 80 : 0)
}

function cancelDrag(event?: PointerEvent) {
  if (event && dragStage?.hasPointerCapture(event.pointerId)) {
    dragStage.releasePointerCapture(event.pointerId)
  }
  potentialDrag = false
  dragging.value = false
  dragDistance = 0
  dragOffset.value = 0
  dragPointerId = null
  dragStage = null
}

function onWheel(event: WheelEvent) {
  const horizontalDelta = Math.abs(event.deltaX) > Math.abs(event.deltaY) * 0.75
    ? event.deltaX
    : event.shiftKey
      ? event.deltaY
      : 0

  if (!horizontalDelta) return
  event.preventDefault()

  wheelDistance += horizontalDelta
  const stepWidth = Math.max(46, Math.min(88, viewportWidth.value * 0.07))
  const steps = Math.trunc(wheelDistance / stepWidth)
  if (steps) {
    queueMove(steps)
    wheelDistance -= steps * stepWidth
  }

  if (wheelReset) clearTimeout(wheelReset)
  wheelReset = setTimeout(() => {
    wheelDistance = 0
  }, 180)
}

function thumbnailCandidates(video: PlaylistVideo) {
  return [...new Set([
    `https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`,
    video.thumbnailUrl,
    `https://i.ytimg.com/vi/${video.id}/sddefault.jpg`,
    `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`,
    `https://i.ytimg.com/vi/${video.id}/mqdefault.jpg`,
    `https://i.ytimg.com/vi/${video.id}/default.jpg`,
  ].filter((candidate): candidate is string => Boolean(candidate)))]
}

function thumbnailUrl(video: PlaylistVideo) {
  return thumbnailCandidates(video)[0]
}

function validateThumbnail(event: Event, video: PlaylistVideo) {
  const image = event.currentTarget as HTMLImageElement
  if (image.naturalWidth <= 120 && image.src.includes('maxresdefault')) {
    useFallbackThumbnail(event, video)
  }
}

function useFallbackThumbnail(event: Event, video: PlaylistVideo) {
  const image = event.currentTarget as HTMLImageElement
  const candidates = thumbnailCandidates(video)
  const currentIndex = candidates.findIndex((candidate) => image.src === candidate)
  const nextIndex = currentIndex >= 0 ? currentIndex + 1 : 1

  if (nextIndex < candidates.length) {
    image.src = candidates[nextIndex]
  } else {
    image.removeAttribute('src')
  }
}

function embedUrl(videoId: string) {
  const index = videos.value.findIndex((video) => video.id === videoId)
  const params = new URLSearchParams({
    autoplay: '1',
    rel: '0',
    playsinline: '1',
    list: playlistId.value,
    index: String(Math.max(index, 0)),
  })
  return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`
}

watch(activeIndex, () => {
  playingVideoId.value = null
})

onMounted(async () => {
  updateViewportWidth()
  window.addEventListener('resize', updateViewportWidth, { passive: true })

  if (!playlistId.value) {
    loadError.value = true
    return
  }

  try {
    createPlayer(await loadYouTubeApi())
  } catch {
    loadError.value = true
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateViewportWidth)
  if (playlistPoll) clearTimeout(playlistPoll)
  if (wheelReset) clearTimeout(wheelReset)
  if (movementTimer) clearTimeout(movementTimer)
  player?.destroy()
})
</script>

<style scoped>
.playlist-carousel {
  --card-width: clamp(18rem, 48vw, 38rem);
  outline: none;
}

.playlist-player-host {
  position: fixed;
  left: -10px;
  bottom: -10px;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  pointer-events: none;
}

.carousel-stage,
.carousel-skeleton {
  position: relative;
  height: clamp(21rem, 39vw, 31rem);
  overflow: hidden;
  perspective: 1500px;
  touch-action: pan-y;
  user-select: none;
}

.carousel-stage {
  cursor: grab;
}

.carousel-stage::after {
  position: absolute;
  z-index: 0;
  right: 16%;
  bottom: 8%;
  left: 16%;
  height: 16%;
  border-radius: 999px;
  background: radial-gradient(ellipse, rgb(var(--ink) / 0.09), transparent 70%);
  content: '';
  filter: blur(18px);
  pointer-events: none;
}

.video-card {
  --carousel-x: 0px;
  --carousel-y: 0px;
  --carousel-scale: 1;
  --carousel-rotate: 0deg;
  position: absolute;
  z-index: 3;
  top: 1.25rem;
  left: 50%;
  display: block;
  width: var(--card-width);
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border: 1px solid rgb(var(--border) / 0.9);
  border-radius: clamp(1rem, 1.8vw, 1.35rem);
  background: rgb(var(--muted));
  box-shadow: 0 18px 45px -28px rgb(var(--ink) / 0.32);
  opacity: 1;
  transform: translate3d(calc(-50% + var(--carousel-x)), var(--carousel-y), 0)
    scale(var(--carousel-scale)) rotateY(var(--carousel-rotate));
  transform-style: preserve-3d;
  transition:
    transform 700ms cubic-bezier(0.16, 1, 0.3, 1),
    opacity 450ms ease,
    filter 450ms ease,
    box-shadow 450ms ease;
  -webkit-tap-highlight-color: transparent;
  -webkit-user-drag: none;
}

.video-card::after {
  position: absolute;
  inset: 0;
  background: rgb(9 9 11 / 0.12);
  content: '';
  opacity: 1;
  pointer-events: none;
  transition: opacity 450ms ease;
}

.video-card-action,
.video-player {
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
  border-radius: inherit;
}

.video-card-action {
  position: relative;
  padding: 0;
  overflow: hidden;
  background: transparent;
  color: inherit;
  cursor: inherit;
  -webkit-user-drag: none;
}

.video-card-action img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}

.video-player {
  position: relative;
  z-index: 3;
  background: #000;
}

.video-card[data-position='-1'] {
  --carousel-x: calc(clamp(14rem, 31vw, 23rem) * -1);
  --carousel-y: 2.75rem;
  --carousel-scale: 0.78;
  --carousel-rotate: 13deg;
  z-index: 2;
  filter: saturate(0.82);
}

.video-card[data-position='1'] {
  --carousel-x: clamp(14rem, 31vw, 23rem);
  --carousel-y: 2.75rem;
  --carousel-scale: 0.78;
  --carousel-rotate: -13deg;
  z-index: 2;
  filter: saturate(0.82);
}

.video-card[data-position='-2'] {
  --carousel-x: calc(clamp(24rem, 53vw, 40rem) * -1);
  --carousel-y: 5rem;
  --carousel-scale: 0.58;
  --carousel-rotate: 20deg;
  z-index: 1;
  opacity: 0.74;
  filter: saturate(0.6);
}

.video-card[data-position='2'] {
  --carousel-x: clamp(24rem, 53vw, 40rem);
  --carousel-y: 5rem;
  --carousel-scale: 0.58;
  --carousel-rotate: -20deg;
  z-index: 1;
  opacity: 0.74;
  filter: saturate(0.6);
}

.video-card--active {
  z-index: 4;
  cursor: pointer;
  box-shadow: 0 28px 70px -34px rgb(var(--ink) / 0.42);
}

.video-card--active::after,
.video-card--playing::after {
  opacity: 0;
}

.is-dragging .video-card {
  transition: none;
}

.carousel-stage.is-dragging,
.carousel-stage.is-dragging .video-card {
  cursor: grabbing;
}

.play-button {
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 50%;
  display: grid;
  width: clamp(3.4rem, 6vw, 4.8rem);
  aspect-ratio: 1;
  place-items: center;
  border: 1px solid rgb(255 255 255 / 0.55);
  border-radius: 999px;
  background: rgb(var(--bg) / 0.9);
  color: rgb(var(--ink));
  box-shadow: 0 12px 36px rgb(9 9 11 / 0.18);
  transform: translate(-50%, -50%);
  transition: transform 250ms cubic-bezier(0.16, 1, 0.3, 1), background-color 250ms ease;
  backdrop-filter: blur(14px);
}

.play-button svg {
  width: 42%;
  margin-left: 5%;
}

.video-card--active:hover .play-button {
  background: rgb(var(--accent));
  color: rgb(var(--accent-contrast));
  transform: translate(-50%, -50%) scale(1.08);
}

.carousel-details {
  position: relative;
  z-index: 5;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 1.5rem 2.5rem;
  width: min(100%, 64rem);
  margin: -2.5rem auto 0;
}

.video-copy {
  min-width: 0;
}

.video-source {
  overflow: hidden;
  margin: 0 0 0.35rem;
  color: rgb(var(--ink-faint));
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-overflow: ellipsis;
  text-transform: uppercase;
  white-space: nowrap;
}

.video-copy h3 {
  display: -webkit-box;
  overflow: hidden;
  margin: 0;
  font-size: clamp(1.05rem, 2vw, 1.35rem);
  line-height: 1.25;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.carousel-actions {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.carousel-count {
  margin-right: 0.45rem;
  color: rgb(var(--ink));
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.95rem;
  letter-spacing: -0.05em;
  white-space: nowrap;
}

.carousel-count span {
  color: rgb(var(--ink-faint));
}

.arrow-controls {
  display: flex;
  gap: 0.45rem;
}

.arrow-controls button {
  display: grid;
  width: 2.75rem;
  aspect-ratio: 1;
  place-items: center;
  border: 1px solid rgb(var(--border));
  border-radius: 999px;
  background: rgb(var(--bg));
  color: rgb(var(--ink));
  transition: border-color 180ms ease, color 180ms ease, transform 180ms ease;
}

.arrow-controls button:hover {
  border-color: rgb(var(--accent));
  color: rgb(var(--accent-ink));
  transform: translateY(-1px);
}

.arrow-controls svg,
.playlist-link svg {
  width: 1.1rem;
}

.playlist-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  min-height: 2.75rem;
  padding: 0 1.15rem;
  border: 1px solid rgb(var(--border));
  border-radius: 999px;
  color: rgb(var(--ink));
  font-size: 0.82rem;
  font-weight: 600;
  text-decoration: none;
  white-space: nowrap;
  transition: border-color 180ms ease, color 180ms ease, transform 180ms ease;
}

.playlist-link:hover {
  border-color: rgb(var(--accent));
  color: rgb(var(--accent-ink));
  transform: translateY(-1px);
}

.carousel-progress {
  grid-column: 1 / -1;
  height: 3px;
  overflow: hidden;
  border-radius: 999px;
  background: rgb(var(--border));
}

.carousel-progress span {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: rgb(var(--accent));
  transition: width 700ms cubic-bezier(0.16, 1, 0.3, 1);
}

.carousel-skeleton {
  opacity: 0.7;
}

.skeleton-card {
  position: absolute;
  top: 1.25rem;
  left: 50%;
  display: block;
  width: var(--card-width);
  aspect-ratio: 16 / 9;
  border: 1px solid rgb(var(--border));
  border-radius: clamp(1rem, 1.8vw, 1.35rem);
  background: linear-gradient(100deg, rgb(var(--muted)) 35%, rgb(var(--elevated)) 50%, rgb(var(--muted)) 65%);
  background-size: 220% 100%;
  animation: carousel-shimmer 1.6s linear infinite;
}

.skeleton-card--center {
  z-index: 2;
  transform: translateX(-50%);
}

.skeleton-card--left {
  transform: translate3d(calc(-50% - clamp(14rem, 31vw, 23rem)), 2.75rem, 0) scale(0.78) rotateY(13deg);
}

.skeleton-card--right {
  transform: translate3d(calc(-50% + clamp(14rem, 31vw, 23rem)), 2.75rem, 0) scale(0.78) rotateY(-13deg);
}

.carousel-error {
  display: flex;
  min-height: 14rem;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
  border: 1px solid rgb(var(--border));
  border-radius: 1.25rem;
  background: rgb(var(--surface));
  color: rgb(var(--ink-faint));
  text-align: center;
}

@keyframes carousel-shimmer {
  to { background-position-x: -220%; }
}

@media (max-width: 767px) {
  .playlist-carousel {
    --card-width: min(82vw, 32rem);
  }

  .carousel-stage,
  .carousel-skeleton {
    height: clamp(16.5rem, 67vw, 23rem);
  }

  .video-card[data-position='-1'] {
    --carousel-x: -66vw;
    --carousel-y: 2rem;
    --carousel-scale: 0.74;
  }

  .video-card[data-position='1'] {
    --carousel-x: 66vw;
    --carousel-y: 2rem;
    --carousel-scale: 0.74;
  }

  .video-card[data-position='-2'],
  .video-card[data-position='2'] {
    opacity: 0;
  }

  .carousel-details {
    grid-template-columns: 1fr;
    gap: 1.2rem;
    margin-top: -1.75rem;
  }

  .carousel-actions {
    display: grid;
    grid-template-columns: auto auto 1fr;
  }

  .playlist-link {
    justify-self: end;
  }
}

@media (max-width: 430px) {
  .carousel-actions {
    grid-template-columns: auto 1fr;
  }

  .playlist-link {
    grid-column: 1 / -1;
    width: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .video-card,
  .carousel-progress span,
  .play-button,
  .arrow-controls button,
  .playlist-link {
    transition-duration: 0.001ms;
  }

  .skeleton-card {
    animation: none;
  }
}
</style>
