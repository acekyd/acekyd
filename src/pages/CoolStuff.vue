<template>
  <Layout :show-logo="true">

    <h1 class="page__title">Cool Shopping</h1>
    <p class="page__title--subtext">
        Check out cool items I find on Amazon that you can buy yourself. (Amazon affiliate, run me your coins please 😉)
    </p>

    <!-- List shopping items -->
    <div class="shopping">
        <a class="post-card content-box" target="_blank" v-for="item in reverseItems" :key="item.id" :href="item.link">
            <div class="post-card__header">
                <div class="post-card__image">
                    <img :src="item.image" />
                </div>
            </div>
            <div class="post-card__content">
                <span class="post-card__title" v-html="item.title" />
                <p class="post-card__description" v-html="item.desc" />
                <p class="post-card__cost" v-html="item.price" />
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

<style lang="scss" scoped>
.shopping {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
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
        width: 45% !important;
        padding: 0px;
        border: 1px solid #ccc;
        background: #ccc;

        @media screen and (max-width: 850px) {
            & {
                width: 92% !important;
                margin: 4%;
            }
        }

        &__header {
            display: flex;
            flex-direction: column;
            margin-bottom: 20px;
            width: 100%;
            padding: 20px;
            background: #fff;

            @media screen and (max-width: 960px) {
                & {
                    flex-direction: column;
                }
            }
        }

        &__content {
            padding: 20px;
        }

        &__image {
            width: 100%;
            margin-right: 4%;
            text-align: center;
        }

        &__title {
            font-size: 1rem;
            font-weight: 900;
            color: #111111;

            @media screen and (max-width: 960px) {
                & {
                    width: 100%;
                }
            }
        }
    }
    a.post-card {
        color: #6B17E6;
    }
}
  .main h1.page__title {
    text-align: center;
  }
  .main .page__title--subtext {
      text-align: center;
      width: 60%;
      margin: 10px auto;
  }


</style>
