<template>
    <header class="header">
        <div class="header__left">
            <NuxtLink class="header__link" href="/">Adewale Abati</NuxtLink>
        </div>

        <div class="header__right">
            <nav>
                <ul class="nav">
                <li>
                    <NuxtLink class="header__link" href="/posts">Blog</NuxtLink>
                </li>
                <li>
                    <NuxtLink class="header__link" to="/talks">Talks</NuxtLink>
                </li>
                <li>
                    <NuxtLink class="header__link" to="/projects">Projects</NuxtLink>
                </li>
                <li>
                    <NuxtLink class="header__link" to="/uses">Uses</NuxtLink>
                </li>
                <li>
                    <NuxtLink class="header__link" to="/now">Now</NuxtLink>
                </li>
                </ul>
            </nav>
        </div>
    </header>
</template>
<style lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: var(--header-height);
  padding: 0 calc(var(--space) / 4);
  top:0;
  z-index: 10;
  max-width: var(--content-width);
  margin: 0 auto 10px auto;
  
  a { text-decoration: none; }
  

  &__left,
  &__right {
    display: flex;
    align-items: center;

    .nav {
      display: flex;
      list-style: none;
      li {
        padding: 10px;
      }
      a {
        font-size: .9em;
      }
    }
  }

  @media screen and (min-width: 1300px) {
    //Make header sticky for large screens
    width: 100%;
  }
}
</style>