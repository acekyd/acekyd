<template>
  <Layout :show-logo="false">
    <!-- Author intro -->
    <Header :show-title="false" />

  </Layout>
</template>

<script>
import Header from '~/components/Header.vue'

export default {
  components: {
    Header
  },
  metaInfo: {
    title: 'Web Engineer and Developer Advocate',
    meta: [
      {
        key: 'og:title',
        property: 'og:title',
        content: 'Adewale Abati - Web Engineer, Developer Advocate and Human!',
      }
    ]
  }
}
</script>
