<template>
    <main class="max-w-3xl m-auto prose">
        <section class="pl-3">
            <Header></Header>
            <h1 class="pageTitle">Projects and Experiments</h1>
            <p class="pageSubtitle lg:prose-xl">Building community centered solutions, open source projects, plugins and more experiments.</p>
        </section>
        <section class="talk-list">
            <div v-for="project in reverseProjectsList()" :key="project.id">
                <div class="card">
                    <h4 v-html="project.title" />
                    <span v-html="project.description" />
                    <small v-if="project.skills">{{ project.skills }}. </small>
                    <p>
                        <a :href="project.github" v-if="project.github">Github</a>&nbsp;
                        <a :href="project.website" v-if="project.website">Website</a>
                    </p>
                </div>
            </div>
        </section>
    </main>

</template>
<script setup lang="ts">
import Projects from "assets/data/projects.json";

useHead({
  titleTemplate: 'Projects and Experiments - Adewale Abati',
})

const reverseProjectsList = () => {
    return Projects.slice().reverse();
}
</script>
<style scoped>
    .projects-list a {
        text-decoration: underline;
        margin-top: 10px;

        span {
            font-weight: normal;
        }
    }
</style>