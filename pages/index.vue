<template>
  <div
    itemscope
    itemtype="https://schema.org/Person"
    id="landing"
    class="author"
  >
    <div class="hero-section">
      <div class="content-left">
        <div class="logo-container">
          <img alt="Ace logo" class="logo__image" src="/logo.png" />
        </div>

        <p class="author__intro">
          Hello! I'm
          <span class="highlight" itemprop="name">Adewale "Ace" Abati</span>—a
          <span class="highlight" itemprop="jobTitle">Web Engineer and Staff Developer Advocate</span> making stuff that shapes how people use technology to create, solve real-world problems, and connect.<br /><br />

          I'm currently immersed in the world of applied <a href="https://block.github.io/goose/blog/2025/01/28/introducing-codename-goose" target="_blank">Agentic AI</a>, 
          <a href="https://github.com/acekyd" rel="noopener" target="_blank">open source</a>, 
          and helping engineers & non-developers harness the power of AI in their workflows at <a href="https://block.xyz/" target="_blank" rel="noopener">Block</a>.

          <br /><br />

          You'll find me building and sharing on 
          <a href="https://github.com/acekyd" rel="noopener" target="_blank">GitHub</a>, 
          <a href="https://youtube.com/acekydtv" rel="noopener" target="_blank">YouTube</a>, 

          and occasionally learning and unwinding on <a href="https://instagram.com/acekydtv" rel="noopener" target="_blank">Instagram</a>, or livestreams on
          <a href="https://www.twitch.tv/acekydtv" rel="noopener" target="_blank">Twitch</a>.

          <br /><br />

          Let's explore the infinite possibilities of technology together—whether you want to build, learn about AI, or just geek out over gadgets, video games, and anime!
        </p>

        <p class="author_links small">
          Previously:
          <a href="https://codesandbox.io/" target="_blank" rel="noopener"
            >CodeSandbox</a
          >,
          <a href="https://flutterwave.com/" target="_blank" rel="noopener"
            >Flutterwave</a
          >,
          <a href="https://ingressive.org/" target="_blank" rel="noopener"
            >Ingressive</a
          >,
          <a href="http://www.withpropel.com/" target="_blank" rel="noopener"
            >Hirefreehands (Propel)</a
          >,
          <a href="https://hotels.ng" target="_blank" rel="noopener">HotelsNG</a>
        </p>
        <br />

        <p class="author__links">
          <a
            href="https://github.com/acekyd/"
            aria-label="Adewale on GitHub"
            target="_blank"
            rel="noopener"
          >
            <font-awesome-icon :icon="['fab', 'github']" />
          </a>
          <a
            href="https://twitter.com/ace_kyd/"
            aria-label="Adewale on Twitter"
            target="_blank"
            rel="noopener"
          >
            <font-awesome-icon :icon="['fab', 'twitter']" />
          </a>
          <a
            href="https://twitch.tv/acekydtv/"
            aria-label="Adewale on Twitch"
            target="_blank"
            rel="noopener"
          >
            <font-awesome-icon :icon="['fab', 'twitch']" />
          </a>
          <a
            href="https://www.linkedin.com/in/acekyd/"
            aria-label="Adewale on LinkedIn"
            target="_blank"
            rel="noopener"
          >
            <font-awesome-icon :icon="['fab', 'linkedin']" />
          </a>
          <a
            href="https://www.youtube.com/acekydtv/"
            aria-label="Adewale on YouTube"
            target="_blank"
            rel="noopener"
          >
            <font-awesome-icon :icon="['fab', 'youtube']" />
          </a>
          <a
            href="https://instagram.com/acekydtv"
            aria-label="Adewale on Instagram"
            target="_blank"
            rel="noopener"
          >
            <font-awesome-icon :icon="['fab', 'instagram']" />
          </a>
          <a 
            href="https://tiktok.com/@acekydtv"
            aria-label="Adewale on TikTok"
            target="_blank"
            rel="noopener"
          >
            <font-awesome-icon :icon="['fab', 'tiktok']" />
          </a>
        </p>

        <p class="author_links menu">
          <NuxtLink to="/posts">blog</NuxtLink>
          <NuxtLink to="/talks">talks</NuxtLink>
          <NuxtLink to="/projects">projects</NuxtLink>
          <NuxtLink to="/uses">uses</NuxtLink>
          <NuxtLink to="/now">now</NuxtLink>
        </p>
      </div>

      <div class="content-right">
        <div class="profile-image-container">
          <img 
            alt="Adewale 'Ace' Abati - Professional headshot" 
            class="profile-image" 
            src="/author.jpg" 
            itemprop="image"
          />
          <div class="logo-overlay">
            <img alt="Ace logo" class="logo__image--small" src="/logo.png" />
          </div>
        </div>
        
        <div class="newsletter-container text-center text-sm">
          <!-- <p>Join 500+ subscribers dedicated to learning and pursuing creativity and excellence together.  </p>
          <br /> -->
          <a 
            href="https://acekyd.substack.com" 
            target="_blank" 
            rel="noopener" 
            class="newsletter-button"
            aria-label="Subscribe to Ace's newsletter on Substack"
          >
            Subscribe on Substack
          </a>
        </div>
      </div>
    </div>
    <br />
  </div>
</template>
<script setup>
useHead({
  titleTemplate: "Adewale Abati - Web Engineer & Developer Advocate",
});
</script>
<style lang="scss" scoped>
#landing.author {
  margin: 10vh 10vw;
  max-width: 1500px;

  .hero-section {
    display: flex;
    gap: 4rem;
    align-items: flex-start;
  }

  .content-left {
    flex: 2;
    min-width: 0;
  }

  .content-right {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2.5rem;
    height: 100%;
    padding-left: 2rem;
    padding-top: 10%;
  }

  .logo-container {
    margin-bottom: 2rem;
  }

  .profile-image-container {
    position: relative;
    width: 270px;
    height: 270px;
  }

  .profile-image {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid #12b488;
    transition: all 0.3s ease;
    animation: float 6s ease-in-out infinite;
  }

  .profile-image:hover {
    transform: scale(1.05);
    border-color: #ff6b9d;
    box-shadow: 0 10px 30px rgba(18, 180, 136, 0.3);
  }

  .logo-overlay {
    position: absolute;
    bottom: 10px;
    right: 10px;
    background: white;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }

  .logo-overlay:hover {
    transform: rotate(10deg) scale(1.1);
  }

  .logo__image--small {
    width: 30px;
    height: 30px;
    margin: 0;
  }

  .newsletter-container {
    // width: 100%;
  }

  .newsletter-button {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: #12b488;
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(18, 180, 136, 0.2);
    text-align: center;
    justify-content: center;
  }

  .newsletter-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(18, 180, 136, 0.3);
    background: #0ea478;
    text-decoration: none;
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  .author__intro {
    font-size: 1.2rem;
    margin-bottom: 20px;
  }

  .author__links {
    margin-bottom: 1em;
    a {
      margin: 0 0.5em;
    }
    a:first-child {
      margin-left: 0;
    }
  }
  .strike {
    text-decoration: line-through;
  }

  .small {
    font-size: 0.8em;
    line-height: 1.7rem;
  }

  .menu a {
    margin-right: 10px;
  }

  // Mobile responsiveness
  @media (max-width: 768px) {
    margin: 5vh 5vw;
    
    .hero-section {
      flex-direction: column;
      gap: 2rem;
    }
    
    .content-right {
      display: none; // Hide headshot section on mobile
    }
  }
}

.highlight {
  font-weight: bold;
}

.logo {
  text-decoration: none;
  color: var(--body-color) !important;
  font-size: 0.9em;

  &__image {
    vertical-align: middle;
    height: 42.8px;
    width: 40px;
    margin-right: 0.5em;
    margin-bottom: 2vh;
  }
}
</style>
