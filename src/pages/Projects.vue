<template>
  <Layout :show-logo="true">

    <h1 class="page__title">My Side Projects</h1>

    <!-- List projects -->
     <div class="projects">
        <div class="post-card content-box" v-for="project in reverseItems" :key="project.id" >
          <div class="post-card__content">
            <h2 class="post-card__title" v-html="project.title" />
              <p class="post-card__description" v-html="project.description" />
            <hr />
              <small v-if="project.skills">{{ project.skills }}. </small>
            <p>
                <a class="link" :href="project.github" v-if="project.github">Github</a>&nbsp;
                <a class="link" :href="project.website" v-if="project.website">Website</a>
            </p>
          </div>
        </div>


    </div>

  </Layout>
</template>

<script>
import Projects from '~/data/projects.json'
import Author from '~/components/Author.vue'

export default {
  components: {
    Author
  },
  metaInfo: {
    title: 'Side Projects'
  },
  data() {
      return {
          projects: Projects
      }
  },
  computed: {
      reverseItems() {
        return this.projects.slice().reverse();
    }
  }
}
</script>

<style lang="scss">
    .main h1.page__title {
      text-align: center;
    }
  .projects .post-card {

    margin-bottom: var(--space);

    h2 {
      font-size: 1.2em;
    }
  }
</style>
