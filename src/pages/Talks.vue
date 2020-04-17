<template>
  <Layout :show-logo="true">

    <h1 class="page__title">Talks and Presentations</h1>

    <!-- List talks -->
    <div class="talks">
        <div class="post-card content-box" v-for="talk in reverseItems" :key="talk.id" >
          <div class="post-card__content">
            <h2 class="post-card__title" v-html="talk.title" />

              <p class="post-card__description" v-html="talk.abstract" />


            <hr />
            <strong>
              <span class="post-card__description" v-html="talk.event" />
            </strong>
            <br />
              <small v-if="talk.date">{{ talk.date }}. </small>
              <small v-if="talk.location">{{ talk.location }}</small>

            <p>
                <a class="link" :href="talk.slides" v-if="talk.slides">Slides</a>&nbsp;
                <a class="link" :href="talk.website" v-if="talk.website">Website</a>
            </p>
          </div>
        </div>


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

<style lang="scss">
  .main h1.page__title {
    text-align: center;
  }

  .talks .post-card {

    margin-bottom: var(--space);

    h2 {
      font-size: 1.2em;
    }
  }
</style>
