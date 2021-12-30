<template>
  <div id="app">

    <header class="header">
      <div class="header__left">
        <Logo v-if="showLogo" />
        <g-image v-if="!showLogo" alt="logo image" class="logo__image" src="~/assets/images/logo.png" blur="5" />

      </div>

      <div class="header__right">
        <nav>
          <ul class="nav">
            <li>
              <a class="header__link" href="https://devlogic.acekyd.com">Blog</a>
            </li>
            <li>
              <g-link class="header__link" to="/talks">Talks</g-link>
            </li>
            <li>
              <g-link class="header__link" to="/projects">Projects</g-link>
            </li>
            <li>
              <g-link class="header__link" to="/cool-stuff">Cool Stuff</g-link>
            </li>
          </ul>
        </nav>
        <ToggleTheme />
      </div>
    </header>

    <main class="main">
      <slot/>
    </main>

    <footer class="footer">
      <span class="footer__copyright">Copyright © {{ new Date().getFullYear() }}. </span>
      <span class="footer__links">Powered by <a href="//gridsome.org"> Gridsome </a></span>
    </footer>

  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import ToggleTheme from '~/components/ToggleTheme.vue'

export default {
  props: {
    showLogo: { default: true }
  },
  components: {
    Logo,
    ToggleTheme
  }
}
</script>

<style lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: var(--header-height);
  padding: 0 calc(var(--space) / 4);
  top:0;
  z-index: 10;

  &__left,
  &__right {
    display: flex;
    align-items: center;

    .nav {
      display: flex;
      list-style: none;
      li {
        padding: 10px;
        margin-top: 30px;
      }
      a {
        text-decoration: none;
        font-size: .9em;
      }
    }
  }

  @media screen and (min-width: 1300px) {
    //Make header sticky for large screens
    width: 100%;
  }
}

.main {
  margin: -30px auto 0;
}

.footer {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: calc(var(--space) / 4);
  text-align: center;
  font-size: .8em;

  > span {
    margin: 0 .35em;
  }

  a {
    color: currentColor;
  }
}
</style>
