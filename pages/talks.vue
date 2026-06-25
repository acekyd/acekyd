<template>
    <div class="container-content py-12 md:py-16">
        <header class="animate-fade-up mb-10">
            <p class="eyebrow mb-3">Speaking</p>
            <h1 class="pageTitle">Talks &amp; Presentations</h1>
            <p class="pageSubtitle">Keynotes, sessions, and mentorship at conferences, meetups, and community events.</p>
        </header>

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
                                <WatchButton 
                                    v-if="talk.video" 
                                    :video-url="talk.video"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
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
  video?: string;
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
  @apply space-y-12;
}

.year-group {
  @apply mb-12;
}

.year-header {
  @apply mb-8 relative;
}

.year-header-button {
  @apply w-full text-left bg-transparent border-none p-0 cursor-pointer rounded-md;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.year-header-button:hover .year-title {
  @apply text-accent;
}

.year-controls {
  @apply flex items-center gap-3 text-ink-faint;
}

.talk-count {
  @apply text-sm font-normal;
}

.chevron-icon {
  @apply text-lg transition-transform duration-200;
}

.year-title {
  @apply text-3xl font-semibold text-ink mb-0 tracking-tight transition-colors duration-200;
}

.year-divider {
  @apply w-16 h-px bg-border mt-4;
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
  @apply bg-surface p-6 rounded-2xl border border-border transition-all duration-300;
}

.talk-card:hover {
  @apply border-accent/30;
}

.talk-header {
  @apply mb-4;
}

.talk-title {
  @apply text-xl font-semibold text-ink mb-3;
}

.talk-meta {
  @apply space-y-2 text-sm;
}

.talk-event,
.talk-date,
.talk-location {
  @apply flex items-center gap-2 text-ink-faint;
}

.talk-event {
  @apply text-base font-medium text-ink-soft;
}

.talk-abstract {
  @apply my-4;
}

.abstract-toggle {
  @apply flex items-center gap-2 cursor-pointer text-ink-soft font-medium hover:text-ink transition-colors;
}

.abstract-content {
  @apply mt-3 text-ink-soft leading-relaxed prose prose-sm dark:prose-invert max-w-none;
}

.talk-slides {
  @apply my-6;
}

.talk-links {
  @apply flex flex-wrap gap-3 pt-4 border-t border-border;
}

.talk-link {
  @apply inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border text-sm font-medium text-ink-soft transition-colors no-underline hover:border-accent/50 hover:text-accent;
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