<template>
    <main class="max-w-3xl m-auto prose">
        <section class="pl-3">
            <Header></Header>
            <h1 class="pageTitle">Talks and Presentations</h1>
            <p class="pageSubtitle lg:prose-xl">Public Speaking, keynotes and mentorship sessions at conferences, meetups, and community events.</p>
        </section>
        
        <section class="talks-content">
            <div v-for="(yearGroup, index) in groupedTalks" :key="yearGroup.year" class="year-group">
                <div class="year-header">
                    <button 
                        @click="toggleYear(yearGroup.year)"
                        class="year-header-button"
                        :aria-expanded="isYearExpanded(yearGroup.year)"
                        :aria-controls="`year-${yearGroup.year}`"
                    >
                        <h2 class="year-title">{{ yearGroup.year }}</h2>
                        <div class="year-controls">
                            <span class="talk-count">({{ yearGroup.talks.length }} talks)</span>
                            <font-awesome-icon 
                                :icon="['fas', isYearExpanded(yearGroup.year) ? 'chevron-up' : 'chevron-down']" 
                                class="chevron-icon"
                            />
                        </div>
                    </button>
                    <div class="year-divider"></div>
                </div>
                
                <div 
                    v-show="isYearExpanded(yearGroup.year)"
                    :id="`year-${yearGroup.year}`"
                    class="year-talks"
                    :class="{ 'year-talks-expanded': isYearExpanded(yearGroup.year) }"
                >
                    <div v-for="talk in yearGroup.talks" :key="talk.id" class="talk-item">
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
                            
                            <div class="talk-slides" v-if="talk.embedLink">
                                <TalkEmbed 
                                    :embed-url="talk.embedLink" 
                                    :slide-url="talk.slides"
                                    :embed-title="talk.title"
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
                </div>
            </div>
        </section>
    </main>
</template>
<script setup lang="ts">
import Talks from "assets/data/talks.json";

// Define the Talk interface to include the new embedLink field
interface Talk {
  id: string;
  title: string;
  date: string;
  event: string;
  location: string;
  slides: string;
  embedLink: string;
  website: string;
  abstract: string;
}

interface YearGroup {
  year: string;
  talks: Talk[];
}

useHead({
  titleTemplate: 'Talks and Presentations - Adewale Abati',
  meta: [
    {
      name: 'description',
      content: 'Public speaking engagements, keynotes, and technical presentations by Adewale "Ace" Abati on developer advocacy, AI, and open source.'
    }
  ]
})

const extractYear = (dateString: string): string => {
  if (!dateString || dateString.trim() === '') {
    return 'Earlier';
  }
  
  // Extract year from date string (e.g., "March 21, 2019" -> "2019")
  const match = dateString.match(/\d{4}/);
  return match ? match[0] : 'Earlier';
}

// Reactive state for expanded years
const expandedYears = ref<Set<string>>(new Set());

const groupedTalks = computed((): YearGroup[] => {
  const talks = Talks as Talk[];
  const groups: { [key: string]: Talk[] } = {};
  
  // Group talks by year
  talks.forEach(talk => {
    const year = extractYear(talk.date);
    if (!groups[year]) {
      groups[year] = [];
    }
    groups[year].push(talk);
  });
  
  // Sort talks within each year by date (most recent first)
  Object.keys(groups).forEach(year => {
    groups[year].sort((a, b) => {
      if (!a.date && !b.date) return 0;
      if (!a.date) return 1;
      if (!b.date) return -1;
      
      // Parse dates for comparison
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });
  });
  
  // Convert to array and sort by year (most recent first)
  const yearGroups: YearGroup[] = Object.entries(groups).map(([year, talks]) => ({
    year,
    talks
  }));
  
  // Sort years (most recent first, but 'Earlier' goes last)
  yearGroups.sort((a, b) => {
    if (a.year === 'Earlier') return 1;
    if (b.year === 'Earlier') return -1;
    return parseInt(b.year) - parseInt(a.year);
  });
  
  return yearGroups;
});

// Initialize with most recent year expanded
onMounted(() => {
  const mostRecentYear = groupedTalks.value[0]?.year;
  if (mostRecentYear) {
    expandedYears.value.add(mostRecentYear);
  }
});

// Methods for handling collapsible functionality
const toggleYear = (year: string) => {
  if (expandedYears.value.has(year)) {
    expandedYears.value.delete(year);
  } else {
    expandedYears.value.add(year);
  }
};

const isYearExpanded = (year: string): boolean => {
  return expandedYears.value.has(year);
};
</script>
<style scoped>
.talks-content {
  @apply px-3 space-y-12;
}

.year-group {
  @apply mb-12;
}

.year-header {
  @apply mb-8 relative;
}

.year-header-button {
  @apply w-full text-left bg-transparent border-none p-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.year-header-button:hover .year-title {
  @apply text-green-600;
}

.year-controls {
  @apply flex items-center gap-3 text-gray-500;
}

.talk-count {
  @apply text-sm font-normal;
}

.chevron-icon {
  @apply text-lg transition-transform duration-200;
}

.year-title {
  @apply text-3xl font-light text-gray-800 mb-0 tracking-wide transition-colors duration-200;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.year-divider {
  @apply w-16 h-0.5 bg-gradient-to-r from-gray-300 to-transparent mt-4;
}

.year-talks {
  @apply space-y-6 overflow-hidden;
  transition: all 0.3s ease-in-out;
}

.year-talks-expanded {
  animation: slideDown 0.3s ease-in-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
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

@media (max-width: 768px) {
  .talks-content {
    @apply space-y-8;
  }
  
  .year-group {
    @apply mb-8;
  }
  
  .year-header {
    @apply mb-6;
  }
  
  .year-title {
    @apply text-2xl mb-0;
  }
  
  .year-controls {
    @apply gap-2;
  }
  
  .talk-count {
    @apply text-xs;
  }
  
  .chevron-icon {
    @apply text-base;
  }
  
  .year-talks {
    @apply space-y-4;
  }
  
  .talk-meta {
    @apply space-y-1;
  }
  
  .talk-links {
    @apply flex-col gap-2;
  }
}
</style>