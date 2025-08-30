<template>
  <div class="project-card" :class="cardClasses">
    <div v-if="project.status" class="project-status-badge" :class="getStatusClass(project.status)">
      {{ getStatusLabel(project.status) }}
    </div>
    
    <component :is="headingTag" v-html="project.title" class="project-title" />
    
    <p class="project-description" v-html="project.description" />
    
    <div class="project-meta">
      <span v-if="project.skills" class="project-skills">{{ project.skills }}</span>
      <span v-if="project.impact" class="project-impact">{{ project.impact }}</span>
      <span v-if="project.lastUpdated && showLastUpdated" class="project-updated">
        Last updated: {{ formatDate(project.lastUpdated) }}
      </span>
    </div>
    
    <div v-if="project.github || project.website" class="project-links">
      <BaseButton
        v-if="project.github"
        :href="project.github"
        variant="secondary"
        size="small"
        external
        :icon="['fab', 'github']"
        aria-label="View source code"
      >
        Code
      </BaseButton>
      
      <BaseButton
        v-if="project.website"
        :href="project.website"
        variant="primary"
        size="small"
        external
        :icon="['fas', 'external-link-alt']"
        aria-label="View live project"
      >
        Live
      </BaseButton>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  project: {
    type: Object,
    required: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  archived: {
    type: Boolean,
    default: false
  },
  showLastUpdated: {
    type: Boolean,
    default: false
  },
  headingTag: {
    type: String,
    default: 'h4',
    validator: (value) => ['h3', 'h4', 'h5'].includes(value)
  }
})

const cardClasses = computed(() => {
  let classes = 'relative'
  
  if (props.featured) {
    classes += ' featured'
  }
  
  if (props.archived) {
    classes += ' archived'
  }
  
  return classes
})

const getStatusClass = (status) => {
  const classes = {
    'active': 'status-active',
    'maintained': 'status-maintained', 
    'archived': 'status-archived'
  }
  return classes[status] || ''
}

const getStatusLabel = (status) => {
  const labels = {
    'active': 'Active',
    'maintained': 'Maintained',
    'archived': 'Archived'
  }
  return labels[status] || status
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
}
</script>

<style scoped>
.project-card {
  @apply bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300;
}

.project-card.featured {
  @apply border-2 border-green-200 bg-gradient-to-br from-green-50 to-white;
}

.project-card.archived {
  @apply opacity-80 bg-gray-50;
}

.project-status-badge {
  @apply absolute top-4 right-4 px-2 py-1 text-xs font-medium rounded-full;
}

.status-active {
  @apply bg-green-100 text-green-800;
}

.status-maintained {
  @apply bg-blue-100 text-blue-800;
}

.status-archived {
  @apply bg-gray-100 text-gray-600;
}

.project-title {
  @apply text-lg font-semibold mb-3 text-gray-900 pr-16;
  color: #12b488;
}

.project-description {
  @apply text-gray-700 mb-4 leading-relaxed;
}

.project-meta {
  @apply flex flex-wrap gap-4 mb-4 text-sm;
}

.project-skills {
  @apply text-gray-600 font-medium;
}

.project-impact {
  @apply text-green-600 font-medium;
}

.project-updated {
  @apply text-gray-500;
}

.project-links {
  @apply flex gap-3;
}

@media (max-width: 768px) {
  .project-meta {
    @apply flex-col gap-2;
  }
}
</style>
