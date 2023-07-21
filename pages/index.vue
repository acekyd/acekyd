<template>
  <div
    itemscope
    itemtype="https://schema.org/Person"
    id="landing"
    class="author"
  >
    <img alt="logo image" class="logo__image" src="logo.png" blur="5" />

    <p class="author__intro">
      Hello! I'm
      <span class="highlight" itemprop="name">Adewale "Ace" Abati</span>. A
      <span class="highlight" itemprop="jobTitle"
        >Web Engineer & Developer Advocate</span
      >. I'm passionate about the web and it's infinite possibilities,
      <a href="https://github.com/acekyd" rel="noopener" target="_blank"
        >open source</a
      >, sharing my experiences on
      <a href="https://youtube.com/acekyd" rel="noopener" target="_blank"
        >YouTube</a
      >
      and playing
      <a href="https://www.twitch.tv/elpunish3rr">video games</a>.<br /><br />

      I'm currently open to new opportunities to learn and build exciting things, touch lives and make a global impact. 
      You can contact me via 
      <a
        href="https://twitter.com/ace_kyd/"
        aria-label="Adewale on Twitter"
        target="_blank"
        rel="noopener"
      >Twitter</a>
       or 
      <a
        href="https://www.linkedin.com/in/acekyd/"
        aria-label="Adewale on LinkedIn"
        target="_blank"
        rel="noopener"
      >
      LinkedIn.
      </a>
    </p>

    <p class="author_links small">
      Previously: <a href="https://codesandbox.io/" target="_blank" rel="noopener">CodeSandbox</a>,
      <a href="https://flutterwave.com/" target="_blank" rel="noopener">Flutterwave</a>,
      <a href="https://ingressive.org/" target="_blank" rel="noopener">Ingressive</a>,
      <a href="http://www.withpropel.com/" target="_blank" rel="noopener">Hirefreehands (Propel)</a>,
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
        href="https://twitch.tv/elpunish3rr/"
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
        href="https://stackoverflow.com/users/1945274/acekyd"
        aria-label="Adewale on StackOverflow"
        target="_blank"
        rel="noopener"
      >
        <font-awesome-icon :icon="['fab', 'stack-overflow']" />
      </a>
      <a
        href="https://www.youtube.com/acekyd/"
        aria-label="Adewale on YouTube"
        target="_blank"
        rel="noopener"
      >
        <font-awesome-icon :icon="['fab', 'youtube']" />
      </a>
    </p>

    <p class="author_links menu">
      <NuxtLink to="/posts">blog</NuxtLink> 
      <NuxtLink to="/talks">talks</NuxtLink>
      <NuxtLink to="/projects">projects</NuxtLink>
    </p>
    <br />
  </div>
</template>
<style lang="scss" scoped>
#landing.author {
  margin: 10vh 10vw;
  max-width: 700px;

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
  }

  .menu a {
    margin-right: 10px;
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