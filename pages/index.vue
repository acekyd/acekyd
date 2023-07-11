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

      I'm currently helping to shape cloud development on the web at
      <a href="https://codesandbox.io/" rel="noopener" target="_blank"
        >CodeSandbox</a
      >
      - helping web developers create, share and collaborate with ease!
    </p>

    <p class="author_links small">
      Previously: <a href="https://flutterwave.com/">Flutterwave</a>,
      <a href="https://ingressive.org/">Ingressive</a>,
      <a href="http://www.withpropel.com/">Hirefreehands (Propel)</a>,
      <a href="https://hotels.ng">HotelsNG</a>
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
      <a href="/posts">blog</a> <a href="/talks">talks</a>
      <a href="/projects">projects</a>
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
