<template>
    <main class="max-w-3xl m-auto prose">
        <section class="pl-3">
            <Header></Header>
            <h1 class="pageTitle">Talks and Presentations</h1>
            <p class="pageSubtitle lg:prose-xl">Public Speaking, keynotes and mentorship sessions.</p>
        </section>
        <section class="talk-list">
            <div v-for="talk in reverseTalksList()" :key="talk.id">
                <div class="card">
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
                    <small v-if="talk.date">{{ talk.date }}. </small>
                    <strong
                        ><small v-if="talk.location">{{ talk.location }}.</small></strong
                    >&nbsp;
                    <a class="link" :href="talk.slides" v-if="talk.slides">Slides</a
                    >&nbsp;
                    <a class="link" :href="talk.website" v-if="talk.website">Website</a>
                    </div>
            </div>
        </section>
    </main>

</template>
<script setup lang="ts">
import Talks from "assets/data/talks.json";

useHead({
  titleTemplate: 'Talks and Presentations - Adewale Abati',
})

const reverseTalksList = () => {
    return Talks.slice().reverse();
}
</script>
<style scoped>
    .talk-list a {
        text-decoration: underline;
        margin-top: 10px;

        span {
            font-weight: normal;
        }
    }
</style>