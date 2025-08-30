<template>
    <main class="max-w-3xl m-auto prose">
        <section class="pl-3">
            <Header></Header>
            <h1 class="pageTitle">Uses</h1>
            <p class="pageSubtitle lg:prose-xl">The tools, software, and hardware I use daily to build, create, and stay productive.</p>
        </section>
        
        <section class="uses-content">
            <div class="uses-category">
                <h2>💻 Development Setup</h2>
                <div class="uses-grid">
                    <div class="uses-item">
                        <h3>Editor</h3>
                        <p><strong>Visual Studio Code</strong> - My primary editor with tons of extensions</p>
                        <p><strong>Key Extensions:</strong> GitLens, Prettier, ESLint, Auto Rename Tag, Live Server</p>
                    </div>
                    
                    <div class="uses-item">
                        <h3>Terminal</h3>
                        <p><strong>iTerm2</strong> with <strong>Oh My Zsh</strong> and <strong>Powerlevel10k</strong> theme</p>
                        <p>Makes the command line experience much more pleasant and productive</p>
                    </div>
                    
                    <div class="uses-item">
                        <h3>Version Control</h3>
                        <p><strong>Git</strong> via command line and <strong>GitHub Desktop</strong> for visual diffs</p>
                        <p><strong>gh CLI</strong> for GitHub operations directly from terminal</p>
                    </div>
                </div>
            </div>

            <div class="uses-category">
                <h2>🛠 Development Tools</h2>
                <div class="uses-grid">
                    <div class="uses-item">
                        <h3>API Testing</h3>
                        <p><strong>Postman</strong> - API development and testing</p>
                        <p><strong>Insomnia</strong> - Alternative REST client</p>
                    </div>
                    
                    <div class="uses-item">
                        <h3>Database</h3>
                        <p><strong>TablePlus</strong> - Database management</p>
                        <p><strong>Redis Insight</strong> - Redis GUI</p>
                    </div>
                    
                    <div class="uses-item">
                        <h3>Design & Prototyping</h3>
                        <p><strong>Figma</strong> - UI/UX design and collaboration</p>
                        <p><strong>Excalidraw</strong> - Quick diagrams and wireframes</p>
                    </div>
                </div>
            </div>

            <div class="uses-category">
                <h2>🎥 Content Creation</h2>
                <div class="uses-grid">
                    <div class="uses-item">
                        <h3>Recording & Streaming</h3>
                        <p><strong>OBS Studio</strong> - Screen recording and live streaming</p>
                        <p><strong>Loom</strong> - Quick video recordings and sharing</p>
                    </div>
                    
                    <div class="uses-item">
                        <h3>Video Editing</h3>
                        <p><strong>DaVinci Resolve</strong> - Professional video editing</p>
                        <p><strong>ScreenFlow</strong> - Screen recording with built-in editing</p>
                    </div>
                    
                    <div class="uses-item">
                        <h3>Graphics & Images</h3>
                        <p><strong>Canva</strong> - Quick graphics and social media content</p>
                        <p><strong>CleanShot X</strong> - Screenshots and annotations</p>
                    </div>
                </div>
            </div>

            <div class="uses-category">
                <h2>💼 Productivity & Organization</h2>
                <div class="uses-grid">
                    <div class="uses-item">
                        <h3>Note Taking</h3>
                        <p><strong>Notion</strong> - Knowledge base and project management</p>
                        <p><strong>Obsidian</strong> - Connected note-taking and thinking</p>
                    </div>
                    
                    <div class="uses-item">
                        <h3>Communication</h3>
                        <p><strong>Slack</strong> - Team communication</p>
                        <p><strong>Discord</strong> - Community management</p>
                        <p><strong>Zoom</strong> - Video calls and webinars</p>
                    </div>
                    
                    <div class="uses-item">
                        <h3>Browser & Extensions</h3>
                        <p><strong>Arc Browser</strong> - My daily driver</p>
                        <p><strong>Chrome</strong> - Development and testing</p>
                        <p><strong>Key Extensions:</strong> 1Password, JSON Viewer, React DevTools</p>
                    </div>
                </div>
            </div>

            <div class="uses-category">
                <h2>🖥 Hardware Setup</h2>
                <div class="uses-grid">
                    <div class="uses-item">
                        <h3>Computer</h3>
                        <p><strong>MacBook Pro 16" M2 Max</strong> - Main development machine</p>
                        <p>64GB RAM, 2TB SSD - Handles everything I throw at it</p>
                    </div>
                    
                    <div class="uses-item">
                        <h3>Monitor & Accessories</h3>
                        <p><strong>LG UltraWide 34"</strong> - External monitor for productivity</p>
                        <p><strong>Magic Keyboard & Magic Mouse</strong> - Apple ecosystem consistency</p>
                    </div>
                    
                    <div class="uses-item">
                        <h3>Audio & Video</h3>
                        <p><strong>Blue Yeti</strong> - Podcast and video recording</p>
                        <p><strong>Sony WH-1000XM4</strong> - Noise-canceling headphones</p>
                        <p><strong>Logitech C920</strong> - Webcam for streaming</p>
                    </div>
                </div>
            </div>

            <div class="uses-category">
                <h2>☁️ Services & Platforms</h2>
                <div class="uses-grid">
                    <div class="uses-item">
                        <h3>Hosting & Deployment</h3>
                        <p><strong>Netlify</strong> - Static site hosting and serverless functions</p>
                        <p><strong>Vercel</strong> - Next.js and React deployments</p>
                        <p><strong>Railway</strong> - Backend services and databases</p>
                    </div>
                    
                    <div class="uses-item">
                        <h3>Storage & CDN</h3>
                        <p><strong>Cloudinary</strong> - Image and video management</p>
                        <p><strong>Dropbox</strong> - File synchronization</p>
                    </div>
                    
                    <div class="uses-item">
                        <h3>Analytics & Monitoring</h3>
                        <p><strong>Google Analytics</strong> - Website analytics</p>
                        <p><strong>Sentry</strong> - Error tracking and performance monitoring</p>
                    </div>
                </div>
            </div>

            <div class="inspiration-note">
                <p><em>This page is inspired by <a href="https://uses.tech/" target="_blank" rel="noopener">uses.tech</a> - 
                a movement to share what tools we use to get work done.</em></p>
                
                <p>Tools change over time, so I try to keep this updated. Last updated: <strong>August 2024</strong></p>
            </div>
        </section>
    </main>
</template>

<script setup lang="ts">
useHead({
  titleTemplate: 'Uses - Adewale Abati',
  meta: [
    {
      name: 'description',
      content: 'The tools, software, and hardware Adewale "Ace" Abati uses daily to build, create, and stay productive as a Web Engineer and Developer Advocate.'
    }
  ]
})
</script>

<style scoped>
.uses-content {
  @apply px-3;
}

.uses-category {
  @apply mb-12;
}

.uses-category h2 {
  @apply text-2xl font-bold mb-6 text-gray-800;
  border-bottom: 3px solid #12b488;
  padding-bottom: 0.5rem;
}

.uses-grid {
  @apply grid gap-6 md:grid-cols-2 lg:grid-cols-3;
}

.uses-item {
  @apply bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow;
}

.uses-item h3 {
  @apply text-lg font-semibold mb-3 text-gray-900;
  color: #12b488;
}

.uses-item p {
  @apply text-gray-700 mb-2 text-sm leading-relaxed;
}

.uses-item p:last-child {
  @apply mb-0;
}

.inspiration-note {
  @apply mt-12 p-6 bg-gray-50 rounded-lg border-l-4 border-pink-500;
}

.inspiration-note p {
  @apply text-gray-600 mb-2;
}

.inspiration-note p:last-child {
  @apply mb-0;
}

@media (max-width: 768px) {
  .uses-grid {
    @apply grid-cols-1;
  }
}
</style>
