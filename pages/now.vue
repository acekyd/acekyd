<template>
    <main class="max-w-3xl m-auto prose">
        <section class="pl-3">
            <Header></Header>
            <h1 class="pageTitle">What I'm Doing Now</h1>
            <p class="pageSubtitle lg:prose-xl">A snapshot of what's currently capturing my attention and energy.</p>
        </section>
        
        <section class="now-content">
            <div class="last-updated">
                <p><em>Last updated: <strong>August 30, 2024</strong> from Lagos, Nigeria 🇳🇬</em></p>
            </div>

            <div class="now-section">
                <h2>🚀 Work & Focus</h2>
                <div class="now-item">
                    <h3>Developer Advocacy at Block</h3>
                    <p>Leading developer advocacy initiatives focusing on <strong>Agentic AI</strong> and how it's transforming developer workflows. Helping engineers and non-developers understand and adopt AI tools in practical, meaningful ways.</p>
                    
                    <h4>Current Projects:</h4>
                    <ul>
                        <li>Creating content around AI-powered development tools</li>
                        <li>Building educational resources for Block's developer community</li>
                        <li>Speaking at conferences about the intersection of AI and web development</li>
                        <li>Mentoring developers on leveraging AI in their daily workflows</li>
                    </ul>
                </div>
            </div>

            <div class="now-section">
                <h2>📚 Learning & Exploration</h2>
                <div class="now-item">
                    <h3>Deep Diving Into AI Tools</h3>
                    <p>Experimenting with various AI coding assistants and understanding how they can enhance (not replace) developer creativity and problem-solving abilities.</p>
                    
                    <h3>Community Building</h3>
                    <p>Exploring new ways to bring diverse communities into tech through accessible AI education and mentorship programs.</p>
                </div>
            </div>

            <div class="now-section">
                <h2>✍️ Content & Sharing</h2>
                <div class="now-item">
                    <h3>Blog & Newsletter</h3>
                    <p>Writing regularly about AI in development, developer advocacy insights, and lessons from building in the open. You can follow along on my <a href="https://acekyd.substack.com" target="_blank" rel="noopener">Substack newsletter</a>.</p>
                    
                    <h3>YouTube & Speaking</h3>
                    <p>Creating educational content on <a href="https://youtube.com/acekyd" target="_blank" rel="noopener">YouTube</a> and speaking at tech conferences about the human side of AI adoption in development.</p>
                </div>
            </div>

            <div class="now-section">
                <h2>🛠 Building & Experimenting</h2>
                <div class="now-item">
                    <h3>Open Source Contributions</h3>
                    <p>Contributing to projects that make AI tools more accessible to developers from diverse backgrounds. Check out my latest work on <a href="https://github.com/acekyd" target="_blank" rel="noopener">GitHub</a>.</p>
                    
                    <h3>Side Projects</h3>
                    <p>Working on tools that help developers understand and implement AI features without the complexity. More details coming soon!</p>
                </div>
            </div>

            <div class="now-section">
                <h2>🎮 Life & Interests</h2>
                <div class="now-item">
                    <h3>Gaming & Streaming</h3>
                    <p>Occasionally streaming on <a href="https://twitch.tv/elpunish3rr" target="_blank" rel="noopener">Twitch</a> - a great way to unwind and connect with the community outside of tech.</p>
                    
                    <h3>Travel & Speaking</h3>
                    <p>Planning conference talks and workshop sessions for 2024. Always excited about speaking opportunities that let me share knowledge and learn from others.</p>
                    
                    <h3>Reading</h3>
                    <p>Currently reading about the psychology of technology adoption and how to make complex technical concepts more approachable for diverse audiences.</p>
                </div>
            </div>

            <div class="now-section">
                <h2>🤝 Let's Connect</h2>
                <div class="now-item">
                    <p>I'm always interested in connecting with folks working on:</p>
                    <ul>
                        <li>AI tools for developers</li>
                        <li>Developer advocacy and community building</li>
                        <li>Open source projects with social impact</li>
                        <li>Making technology more inclusive and accessible</li>
                    </ul>
                    
                    <p>Feel free to reach out on <a href="https://twitter.com/ace_kyd" target="_blank" rel="noopener">Twitter</a> or <a href="https://linkedin.com/in/acekyd" target="_blank" rel="noopener">LinkedIn</a> if any of this resonates with you!</p>
                </div>
            </div>

            <div class="about-now">
                <h3>About This Page</h3>
                <p>This is a <a href="https://nownownow.com/about" target="_blank" rel="noopener">"now page"</a> - 
                a concept by Derek Sivers to share what you're focused on right now. It's like a regularly updated "about" page 
                that gives people a sense of what's currently important to you.</p>
                
                <p>I try to update this monthly to keep it current and useful. If something here sparks your interest or 
                you're working on something similar, I'd love to hear from you!</p>
            </div>
        </section>
    </main>
</template>

<script setup lang="ts">
useHead({
  titleTemplate: 'Now - Adewale Abati',
  meta: [
    {
      name: 'description',
      content: 'What Adewale "Ace" Abati is currently focused on - work projects, learning goals, and life updates.'
    }
  ]
})
</script>

<style scoped>
.now-content {
  @apply px-3;
}

.last-updated {
  @apply mb-8 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400;
}

.last-updated p {
  @apply text-blue-800 mb-0;
}

.now-section {
  @apply mb-10;
}

.now-section h2 {
  @apply text-2xl font-bold mb-4 text-gray-800;
  border-bottom: 3px solid #12b488;
  padding-bottom: 0.5rem;
}

.now-item {
  @apply bg-white p-6 rounded-lg shadow-sm border border-gray-100;
}

.now-item h3 {
  @apply text-xl font-semibold mb-3;
  color: #12b488;
}

.now-item h4 {
  @apply text-lg font-medium mb-2 mt-4 text-gray-800;
}

.now-item p {
  @apply text-gray-700 mb-3 leading-relaxed;
}

.now-item ul {
  @apply list-disc list-inside text-gray-700 mb-3 space-y-1;
}

.now-item li {
  @apply ml-4;
}

.about-now {
  @apply mt-12 p-6 bg-gray-50 rounded-lg border-l-4 border-pink-500;
}

.about-now h3 {
  @apply text-lg font-semibold mb-3 text-gray-900;
}

.about-now p {
  @apply text-gray-600 mb-3 leading-relaxed;
}

.about-now p:last-child {
  @apply mb-0;
}
</style>
