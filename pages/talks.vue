<template>
    <main class="max-w-3xl m-auto prose">
        <section class="pl-3">
            <Header></Header>
            <h1 class="pageTitle">Talks and Presentations</h1>
            <p class="pageSubtitle lg:prose-xl">Public Speaking, keynotes and mentorship sessions at conferences, meetups, and community events.</p>
        </section>
        
        <section class="talks-content">
            <div v-for="talk in reverseTalksList()" :key="talk.id" class="talk-item">
                <div class="talk-card">
                    <div class="talk-header">
                        <h3 class="talk-title" v-html="talk.title" />
                        <div class="talk-meta">
                            <span class="talk-event">
                                <font-awesome-icon :icon="['fas', 'calendar']" />
                                <strong v-html="talk.event" />
                            </span>
                            <span class="talk-date" v-if="talk.date">
                                <font-awesome-icon :icon="['fas', 'clock']" />
                                {{ talk.date }}
                            </span>
                            <span class="talk-location" v-if="talk.location">
                                <font-awesome-icon :icon="['fas', 'map-marker-alt']" />
                                {{ talk.location }}
                            </span>
                        </div>
                    </div>
                    
                    <div class="talk-abstract" v-if="talk.abstract">
                        <details>
                            <summary class="abstract-toggle">
                                <font-awesome-icon :icon="['fas', 'info-circle']" />
                                Talk Abstract
                            </summary>
                            <div class="abstract-content" v-html="talk.abstract" />
                        </details>
                    </div>
                    
                    <div class="talk-slides" v-if="talk.slides">
                        <SlideShareEmbed 
                            :slide-url="talk.slides" 
                            :slide-title="talk.title"
                        />
                    </div>
                    
                    <div class="talk-links">
                        <a class="talk-link slides" :href="talk.slides" v-if="talk.slides" target="_blank" rel="noopener">
                            <font-awesome-icon :icon="['fas', 'presentation']" />
                            Slides
                        </a>
                        <a class="talk-link website" :href="talk.website" v-if="talk.website" target="_blank" rel="noopener">
                            <font-awesome-icon :icon="['fas', 'external-link-alt']" />
                            Event
                        </a>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>
<script setup lang="ts">
import Talks from "assets/data/talks.json";

useHead({
  titleTemplate: 'Talks and Presentations - Adewale Abati',
  meta: [
    {
      name: 'description',
      content: 'Public speaking engagements, keynotes, and technical presentations by Adewale "Ace" Abati on developer advocacy, AI, and open source.'
    }
  ]
})

const reverseTalksList = () => {
    return Talks.slice().reverse();
}
</script>
<style scoped>
.talks-content {
  @apply px-3 space-y-6;
}

.talk-item {
  @apply mb-6;
}

.talk-card {
  @apply bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300;
}

.talk-header {
  @apply mb-4;
}

.talk-title {
  @apply text-xl font-bold text-gray-900 mb-3;
  color: #12b488;
}

.talk-meta {
  @apply space-y-2 text-sm;
}

.talk-event,
.talk-date,
.talk-location {
  @apply flex items-center gap-2 text-gray-600;
}

.talk-event {
  @apply text-base font-medium;
}

.talk-abstract {
  @apply my-4;
}

.abstract-toggle {
  @apply flex items-center gap-2 cursor-pointer text-gray-700 font-medium hover:text-gray-900 transition-colors;
}

.abstract-content {
  @apply mt-3 text-gray-700 leading-relaxed prose prose-sm max-w-none;
}

.talk-slides {
  @apply my-6;
}

.talk-links {
  @apply flex gap-3 pt-4 border-t border-gray-100;
}

.talk-link {
  @apply inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors no-underline;
}

.talk-link.slides {
  @apply bg-blue-100 text-blue-700 hover:bg-blue-200;
}

.talk-link.website {
  @apply bg-green-100 text-green-700 hover:bg-green-200;
}

@media (prefers-color-scheme: dark) {
  .talk-card {
    @apply bg-gray-800 border-gray-700;
  }
  
  .talk-title {
    @apply text-gray-100;
  }
  
  .talk-event,
  .talk-date,
  .talk-location,
  .abstract-toggle,
  .abstract-content {
    @apply text-gray-300;
  }
  
  .abstract-toggle:hover {
    @apply text-gray-100;
  }
  
  .talk-links {
    @apply border-gray-700;
  }
}

@media (max-width: 768px) {
  .talk-meta {
    @apply space-y-1;
  }
  
  .talk-links {
    @apply flex-col gap-2;
  }
}
</style>