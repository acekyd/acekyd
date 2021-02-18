<template>
  <Layout :show-logo="true">

    <h1 class="page__title">Cool Shopping</h1>
    <p class="page__title--subtext">
        Check out cool items I find on Amazon that you can buy yourself. (Amazon affiliate, run me your coins please 😉)
    </p>

    <!-- List shopping items -->
    <div class="shopping">
        <a class="post-card content-box" v-for="item in reverseItems" :key="item.id" :href="item.link">
            <div class="post-card__header">
                <div class="post-card__image">
                    <img :src="item.image" />
                </div>
                <span class="post-card__title" v-html="item.title" />
            </div>

            <div class="post-card__content">
                <p class="post-card__description" v-html="item.desc" />
                <p class="post-card__cost" v-html="item.price" />

                <hr />
                <strong>
                <span class="post-card__description" v-html="item.event" />
                </strong>
                <p v-html="item.code">
                </p>
            </div>

        </a>

    </div>

  </Layout>
</template>

<script>
import Items from '~/data/shopping.json'
import Author from '~/components/Author.vue'

export default {
  components: {
    Author
  },
  metaInfo: {
    title: 'Cool Amazon Stuff'
  },
  data() {
      return {
          items: Items
      }
  },
  computed: {
      reverseItems() {
        return this.items.slice().reverse();
    }
  }
}
</script>

<style lang="scss">
.shopping {
    display: flex;
    justify-content: center;
    @media screen and (max-width: 800px) {
        & {
            flex-direction: column;
        }
    }

    .post-card {
        margin-bottom: var(--space);
        display: flex;
        flex-direction: column;
        text-decoration: none;
        margin: 10px 20px;

        @media screen and (max-width: 800px) {
            & {
                width: 92%;
                margin: 4%;
            }
        }

        &__header {
            display: flex;
            flex-direction: row;
            margin-bottom: 20px;
        }

        &__image {
            width: 40%;
            margin-right: 4%;
        }

        &__title {
            font-size: 1rem;
            font-weight: 900;
            width: 50%;
            color: var(--title-color);
        }
    }
}
  .main h1.page__title {
    text-align: center;
  }
  .main .page__title--subtext {
      text-align: center;
      width: 80%;
      margin: 10px auto;
  }


</style>
