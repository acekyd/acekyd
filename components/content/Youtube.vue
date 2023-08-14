<template>
	<div>
		<iframe :src="'https://www.youtube.com/embed/' + id"
   width="100%" height="400px" frameborder="0" allowfullscreen></iframe>
	</div>
</template>
<style>

</style>
<script setup>
defineProps({
  id: {
    type: String,
    default: ''
  }
})
</script>