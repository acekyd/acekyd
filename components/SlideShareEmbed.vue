<template>
  <div class="slideshare-embed">
    <div v-if="!showEmbed" class="slideshare-preview">
      <div class="preview-content">
        <div class="slideshare-icon">
          <font-awesome-icon :icon="['fas', 'presentation']" />
        </div>
        <h4 class="preview-title">{{ slideTitle || 'View Slides' }}</h4>
        <p class="preview-description">Click to load the SlideShare presentation</p>
        <div class="preview-actions">
          <button @click="loadEmbed" class="load-embed-btn">
            <font-awesome-icon :icon="['fas', 'play']" />
            Load Presentation
          </button>
          <a :href="slideUrl" target="_blank" rel="noopener" class="direct-link-btn">
            <font-awesome-icon :icon="['fas', 'external-link-alt']" />
            Open in SlideShare
          </a>
        </div>
      </div>
    </div>
    
    <div v-else class="slideshare-container">
      <iframe 
        :src="embedUrl" 
        width="100%" 
        height="400" 
        frameborder="0" 
        marginwidth="0" 
        marginheight="0" 
        scrolling="no" 
        allowfullscreen
        loading="lazy"
        @error="handleEmbedError"
      ></iframe>
      <div class="embed-fallback" v-if="embedError">
        <p>Unable to load the embedded presentation.</p>
        <a :href="slideUrl" target="_blank" rel="noopener" class="fallback-link">
          <font-awesome-icon :icon="['fas', 'external-link-alt']" />
          View on SlideShare
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  slideUrl: string
  slideTitle?: string
}

const props = defineProps<Props>()

const showEmbed = ref(false)
const embedError = ref(false)

// Extract SlideShare ID from URL for embed
const getSlideShareId = (url: string): string => {
  // Extract the last part of the URL which is typically the slide ID/slug
  const parts = url.split('/')
  return parts[parts.length - 1] || ''
}

const embedUrl = computed(() => {
  const slideId = getSlideShareId(props.slideUrl)
  // Try the embed URL format
  return `https://www.slideshare.net/slideshow/embed_code/key/${slideId}`
})

const loadEmbed = () => {
  showEmbed.value = true
  embedError.value = false
}

const handleEmbedError = () => {
  embedError.value = true
}
</script>

<style scoped>
.slideshare-embed {
  @apply w-full my-6;
}

.slideshare-preview {
  @apply bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors;
}

.preview-content {
  @apply max-w-md mx-auto;
}

.slideshare-icon {
  @apply text-4xl text-gray-400 mb-4;
}

.preview-title {
  @apply text-lg font-semibold text-gray-900 mb-2;
}

.preview-description {
  @apply text-gray-600 mb-6;
}

.preview-actions {
  @apply space-y-3;
}

.load-embed-btn {
  @apply w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2;
}

.direct-link-btn {
  @apply w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 no-underline;
}

.slideshare-container {
  @apply relative bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden;
}

.embed-fallback {
  @apply absolute inset-0 bg-white flex flex-col items-center justify-center p-4;
}

.fallback-link {
  @apply mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2 no-underline;
}

@media (prefers-color-scheme: dark) {
  .slideshare-preview {
    @apply bg-gray-800 border-gray-600;
  }
  
  .preview-title {
    @apply text-gray-100;
  }
  
  .preview-description {
    @apply text-gray-300;
  }
  
  .direct-link-btn {
    @apply bg-gray-700 text-gray-200 hover:bg-gray-600;
  }
  
  .slideshare-container {
    @apply bg-gray-800 border-gray-700;
  }
  
  .embed-fallback {
    @apply bg-gray-800 text-gray-200;
  }
}
</style>
