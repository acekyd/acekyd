<template>
    <main class="max-w-3xl m-auto prose">
        <section class="hero-section mt-8 bg-slate-200 p-8">
            <header>
                <h1 class="font-black text-4xl">Welcome to DevLogic</h1>
                <p>A knowledgebase of guides to guide you through thinking about features and building them.</p>
            </header>
        </section>
        <section class="article-list">
            <ContentList path="/" v-slot="{ list }">
                <div v-for="article in list" :key="article._path" class="article-item">
                    <h4><NuxtLink :to="article._path">{{ article.title }}</NuxtLink></h4>
                    <p>{{ article.description }}</p>
                </div>
            </ContentList>

        </section>
    </main>

</template>
<style scoped>
    .article-item {
        @apply rounded bg-slate-50 mt-4 p-1 pl-4;
    }
</style>