<template>
  <Layout :show-logo="true">
    <h1 class="page__title">Talks and Presentations</h1>

    <!-- List talks -->
    <div class="talks">
      <div
        class="post-card content-box"
        v-for="talk in reverseItems"
        :key="talk.id"
      >
        <div class="post-card__content">
          <details>
            <summary>
              <strong
                ><span class="post-card__title" v-html="talk.title"
              /></strong>
              at
              <strong>
                <span class="post-card__description" v-html="talk.event" />
              </strong>
            </summary>
            <p class="post-card__description" v-html="talk.abstract" />
          </details>
          <hr />
          <small v-if="talk.date">{{ talk.date }}. </small>
          <strong
            ><small v-if="talk.location">{{ talk.location }}.</small></strong
          >&nbsp;
          <a class="link" :href="talk.slides" v-if="talk.slides">Slides</a
          >&nbsp;
          <a class="link" :href="talk.website" v-if="talk.website">Website</a>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
import Talks from "~/data/talks.json";
import Author from "~/components/Author.vue";

export default {
  components: {
    Author
  },
  metaInfo: {
    title: "Talks and Presentations"
  },
  data() {
    return {
      talks: Talks
    };
  },
  computed: {
    reverseItems() {
      return this.talks.slice().reverse();
    }
  }
};
</script>

<style lang="scss">
.talks .post-card__description {
  margin-top: 20px;
}
</style>
