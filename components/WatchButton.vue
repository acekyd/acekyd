<template>
  <a 
    :href="videoUrl" 
    target="_blank" 
    rel="noopener noreferrer" 
    class="watch-button"
  >
    <font-awesome-icon :icon="['fas', 'play']" />
    Watch
  </a>
</template>

<script setup lang="ts">
interface Props {
  videoUrl: string
}

const props = defineProps<Props>()
</script>

<style scoped>
.watch-button {
  @apply inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors no-underline font-medium;
}

.watch-button:hover {
  @apply text-white no-underline;
}
</style>
