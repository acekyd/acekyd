<template>
    <main class="max-w-3xl m-auto prose">
        <section class="pl-3">
            <Header></Header>
            <h1 class="pageTitle">Blog</h1>
            <p class="pageSubtitle lg:prose-xl">Gathering thoughts about experiments, technology and opinions.</p>
        </section>
        <section class="article-list">
            <ContentList :query="query" v-slot="{ list }">
                <div v-for="article in list" :key="article._path">
                    <NuxtLink :to="article._path">
                        <div class="card article-item prose max-w-3xl">
                            <h4 class="prose-xl">{{ article.title }}</h4>
                            <span class="">{{ article.description }}</span><br />
                            <span class="prose-sm">{{ getDate(article.date) }}</span>
                        </div>
                    </NuxtLink>
                </div>
            </ContentList>

        </section>
    </main>

</template>
<script setup lang="ts">
import type { QueryBuilderParams } from '@nuxt/content/dist/runtime/types'
const query: QueryBuilderParams = { path: '/posts', limit: 30, sort: [{ date: -1 }] }

useHead({
  titleTemplate: 'Blog - Adewale Abati',
})

</script>
<style scoped>
    .article-list a {
        text-decoration: none;
        margin-top: 10px;
        transition: all 0.3s ease;

        span {
            font-weight: normal;
        }
    }

    .article-list a:hover .article-item {
        background-color: rgba(18, 180, 136, 0.05);
        transform: translateX(8px);
    }

    .article-list a:hover h4 {
        color: #12b488;
    }
</style>