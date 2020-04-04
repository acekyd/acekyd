<template>
  <Layout :show-logo="true">
    <!-- Author intro -->
    <Author :show-title="true" />

    <!-- List posts -->
    <div class="talks">
        <ul>
            <li v-for="talk in reverseItems" :key="talk.id">
                <span class="talks__date">{{talk.date}}:</span>
                <span class="talks__title">
                &nbsp;
                <a :href="talk.link">{{talk.title}}</a> -
                </span>
                <span class="talks__date">&nbsp;{{talk.event}}</span>
            </li>
        </ul>
    </div>

  </Layout>
</template>

<script>
import Talks from '~/data/talks.json'
import Author from '~/components/Author.vue'

export default {
  components: {
    Author
  },
  metaInfo: {
    title: 'Talks and Presentations'
  },
  data() {
      return {
          talks: Talks
      }
  },
  computed: {
      reverseItems() {
        return this.talks.slice().reverse();
    }
  }
}
</script>
