<template>
  <div class="talk-embed">
    <div v-if="!showEmbed" class="embed-preview">
      <div class="preview-content">
        <div class="embed-icon">
          <font-awesome-icon :icon="['fas', 'presentation']" />
        </div>
        <h4 class="preview-title">{{ embedTitle || 'View Slides' }}</h4>
        <p class="preview-description">Click to load the embedded presentation</p>
        <div class="preview-actions">
          <button @click="loadEmbed" class="load-embed-btn">
            <font-awesome-icon :icon="['fas', 'play']" />
            Load Presentation
          </button>
          <a :href="slideUrl" target="_blank" rel="noopener" class="direct-link-btn">
            <font-awesome-icon :icon="['fas', 'external-link-alt']" />
            Open Directly
          </a>
        </div>
      </div>
    </div>
    
    <div v-else class="embed-container">
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
          View Directly
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  embedUrl: string
  slideUrl: string
  embedTitle?: string
}

const props = defineProps<Props>()

const showEmbed = ref(false)
const embedError = ref(false)

const loadEmbed = () => {
  showEmbed.value = true
  embedError.value = false
}

const handleEmbedError = () => {
  embedError.value = true
}
</script>

<style scoped>
.talk-embed {
  @apply w-full my-6;
}

.embed-preview {
  @apply bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors;
}

.preview-content {
  @apply max-w-md mx-auto;
}

.embed-icon {
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

.embed-container {
  @apply relative bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden;
}

.embed-fallback {
  @apply absolute inset-0 bg-white flex flex-col items-center justify-center p-4;
}

.fallback-link {
  @apply mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2 no-underline;
}


</style>
