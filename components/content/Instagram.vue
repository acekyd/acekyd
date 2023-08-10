<template>
  <div>
    <iframe
      :src="'https://www.instagram.com/p/' + id + '/embed/'"
      frameborder="0"
      scrolling="no"
      allowtransparency="true"
      allowfullscreen="true"
      style="width: 100%; max-width: 500px; height: 600px; margin: 0 auto;"
    ></iframe>
  </div>
</template>
<script setup>
defineProps({
  id: {
    type: String,
    default: ''
  }
})
</script>