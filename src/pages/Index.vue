<template>
  <Layout :show-logo="false">
    <!-- Author intro -->
    <Header :show-title="true" />

  </Layout>
</template>


<script>
import Header from '~/components/Header.vue'
import PostCard from '~/components/PostCard.vue'

export default {
  components: {
    Header,
    PostCard
  },
  metaInfo: {
    title: 'Adewale Abati',
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
