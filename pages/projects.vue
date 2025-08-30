<template>
    <main class="max-w-3xl m-auto prose">
        <section class="pl-3">
            <Header></Header>
            <h1 class="pageTitle">Projects and Experiments</h1>
            <p class="pageSubtitle lg:prose-xl">Building community centered solutions, open source projects, plugins and more experiments.</p>
        </section>
        
        <!-- Featured Projects -->
        <section class="projects-section" v-if="featuredProjects().length > 0">
            <h2 class="section-title">🌟 Featured Projects</h2>
            <div class="projects-grid">
                <div v-for="project in featuredProjects()" :key="`featured-${project.id}`" class="project-card featured">
                    <div class="project-status-badge" :class="getStatusClass(project.status)">
                        {{ getStatusLabel(project.status) }}
                    </div>
                    <h3 v-html="project.title" />
                    <p class="project-description" v-html="project.description" />
                    <div class="project-meta">
                        <span class="project-skills" v-if="project.skills">{{ project.skills }}</span>
                        <span class="project-impact" v-if="project.impact">{{ project.impact }}</span>
                    </div>
                    <div class="project-links">
                        <a :href="project.github" v-if="project.github" class="project-link github" target="_blank" rel="noopener">
                            <font-awesome-icon :icon="['fab', 'github']" /> Code
                        </a>
                        <a :href="project.website" v-if="project.website" class="project-link website" target="_blank" rel="noopener">
                            <font-awesome-icon :icon="['fas', 'external-link-alt']" /> Live
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <!-- Active & Maintained Projects -->
        <section class="projects-section">
            <h2 class="section-title">🚀 Active & Maintained Projects</h2>
            <div class="projects-list">
                <div v-for="project in activeProjects()" :key="`active-${project.id}`" class="project-card">
                    <div class="project-status-badge" :class="getStatusClass(project.status)">
                        {{ getStatusLabel(project.status) }}
                    </div>
                    <h4 v-html="project.title" />
                    <p class="project-description" v-html="project.description" />
                    <div class="project-meta">
                        <span class="project-skills" v-if="project.skills">{{ project.skills }}</span>
                        <span class="project-updated">Last updated: {{ formatDate(project.lastUpdated) }}</span>
                    </div>
                    <div class="project-links">
                        <a :href="project.github" v-if="project.github" class="project-link github" target="_blank" rel="noopener">
                            <font-awesome-icon :icon="['fab', 'github']" /> Code
                        </a>
                        <a :href="project.website" v-if="project.website" class="project-link website" target="_blank" rel="noopener">
                            <font-awesome-icon :icon="['fas', 'external-link-alt']" /> Live
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <!-- Archived Projects -->
        <section class="projects-section">
            <h2 class="section-title">📚 Archived Projects</h2>
            <p class="archive-note">These projects served their purpose and are now archived. They remain here as part of my journey and for reference.</p>
            <div class="projects-list archived">
                <div v-for="project in archivedProjects()" :key="`archived-${project.id}`" class="project-card archived">
                    <div class="project-status-badge archived">
                        {{ getStatusLabel(project.status) }}
                    </div>
                    <h4 v-html="project.title" />
                    <p class="project-description" v-html="project.description" />
                    <div class="project-meta">
                        <span class="project-skills" v-if="project.skills">{{ project.skills }}</span>
                        <span class="project-impact" v-if="project.impact">{{ project.impact }}</span>
                    </div>
                    <div class="project-links">
                        <a :href="project.github" v-if="project.github" class="project-link github" target="_blank" rel="noopener">
                            <font-awesome-icon :icon="['fab', 'github']" /> Code
                        </a>
                        <a :href="project.website" v-if="project.website" class="project-link website" target="_blank" rel="noopener">
                            <font-awesome-icon :icon="['fas', 'external-link-alt']" /> Live
                        </a>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>
<script setup lang="ts">
import Projects from "assets/data/projects.json";

useHead({
  titleTemplate: 'Projects and Experiments - Adewale Abati',
  meta: [
    {
      name: 'description',
      content: 'A collection of open source projects, tools, and experiments by Adewale "Ace" Abati - from active community projects to archived learning experiences.'
    }
  ]
})

const featuredProjects = () => {
    return Projects.filter(project => project.featured === true);
}

const activeProjects = () => {
    return Projects.filter(project => project.status === 'active' || project.status === 'maintained').filter(project => !project.featured);
}

const archivedProjects = () => {
    return Projects.filter(project => project.status === 'archived');
}

const getStatusClass = (status: string) => {
    const classes = {
        'active': 'status-active',
        'maintained': 'status-maintained', 
        'archived': 'status-archived'
    };
    return classes[status] || '';
}

const getStatusLabel = (status: string) => {
    const labels = {
        'active': 'Active',
        'maintained': 'Maintained',
        'archived': 'Archived'
    };
    return labels[status] || status;
}

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
}
</script>
<style scoped>
.projects-section {
  @apply mb-12 px-3;
}

.section-title {
  @apply text-2xl font-bold mb-6 text-gray-800;
  border-bottom: 3px solid #12b488;
  padding-bottom: 0.5rem;
}

.projects-grid {
  @apply grid gap-6 md:grid-cols-2;
}

.projects-list {
  @apply space-y-4;
}

.project-card {
  @apply bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 relative;
}

.project-card.featured {
  @apply border-2 border-green-200 bg-gradient-to-br from-green-50 to-white;
}

.project-card.archived {
  @apply opacity-80;
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

.project-card h3,
.project-card h4 {
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

.project-link {
  @apply inline-flex items-center gap-1 px-3 py-1 rounded-md text-sm font-medium transition-colors no-underline;
}

.project-link.github {
  @apply bg-gray-100 text-gray-700 hover:bg-gray-200;
}

.project-link.website {
  @apply bg-blue-100 text-blue-700 hover:bg-blue-200;
}

.archive-note {
  @apply text-gray-600 mb-6 italic;
}

.projects-list.archived .project-card {
  @apply bg-gray-50;
}

@media (max-width: 768px) {
  .projects-grid {
    @apply grid-cols-1;
  }
  
  .project-meta {
    @apply flex-col gap-2;
  }
}
</style>