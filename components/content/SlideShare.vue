<template>
  <div class="slideshare-embed">
    <div v-if="!showEmbed" class="embed-placeholder" @click="loadEmbed">
      <div class="placeholder-content">
        <font-awesome-icon :icon="['fas', 'play-circle']" class="play-icon" />
        <h4>{{ title }}</h4>
        <p>Click to load SlideShare presentation</p>
        <span class="load-button">Load Slides</span>
      </div>
    </div>
    
    <div v-else class="embed-container">
      <iframe 
        :src="embedUrl" 
        frameborder="0" 
        allowfullscreen
        title="SlideShare Presentation"
        loading="lazy"
      ></iframe>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  url: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  }
})

const showEmbed = ref(false)

const embedUrl = computed(() => {
  if (!props.url) return ''
  
  // Extract SlideShare slide name from URL
  // URL format: https://www.slideshare.net/AbatiAdewale/slide-title
  const match = props.url.match(/slideshare\.net\/[^\/]+\/(.+)$/)
  if (match) {
    const slideName = match[1]
    // Use the direct embed format
    return `https://www.slideshare.net/slideshow/embed_code/key/${slideName}`
  }
  
  return props.url
})

const loadEmbed = () => {
  showEmbed.value = true
}
</script>

<style scoped>
.slideshare-embed {
  margin: 1rem 0;
}

.embed-placeholder {
  @apply bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-dashed border-blue-200 rounded-lg p-8 text-center cursor-pointer hover:border-blue-300 transition-all duration-300;
}

.embed-placeholder:hover {
  @apply bg-gradient-to-r from-blue-100 to-indigo-100;
}

.placeholder-content {
  @apply space-y-3;
}

.play-icon {
  @apply text-4xl text-blue-500 mb-2;
}

.placeholder-content h4 {
  @apply text-lg font-semibold text-gray-800 mb-1;
}

.placeholder-content p {
  @apply text-gray-600 text-sm;
}

.load-button {
  @apply inline-block bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition-colors;
}

.embed-container {
  @apply relative w-full;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  height: 0;
}

.embed-container iframe {
  @apply absolute top-0 left-0 w-full h-full rounded-lg;
}


</style>
