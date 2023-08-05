<template>
  <main class="max-w-3xl m-auto prose">
    <section class="pl-3">
      <Header></Header> 
    </section>
    <section class="content-body px-4">
      <section class="mb-1">
        <nav class="flex not-prose" aria-label="Breadcrumb">
          <ol class="inline-flex items-center space-x-1 md:space-x-3">
            <li class="inline-flex items-center">
              <NuxtLink to="/" class="inline-flex items-center text-sm font-small">
                <svg class="w-3 h-3 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                </svg>
                Home
              </NuxtLink>
            </li>
            <li>
              <div class="flex items-center">
                <svg class="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                </svg>
                <NuxtLink to="/posts" class="text-sm">Blog</NuxtLink>
              </div>
            </li>
            <li aria-current="page">
              <div class="flex items-center">
                <svg class="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                </svg>
                <span class="text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">{{ data.title }}</span>
              </div>
            </li>
          </ol>
        </nav>
      </section>
      <article class="mt-4">
        <h1>{{ data.title }}</h1>
        <ContentDoc>
          <template #not-found>
          <h4>Ooops! Looks like that document doesn't exist.</h4>
        </template>
        </ContentDoc>
        <DisqusComments :identifier="path"/>
      </article>
    </section>
  </main>
</template>
<script setup>
const { path } = useRoute();
const cleanedPath = path.replace(/\/$/, '') // temporary hack for trailing slashes.

const { data } = await useAsyncData(`content-${cleanedPath}`, () => {
  return queryContent().where({ _path: cleanedPath }).findOne()
});

useHead({
  titleTemplate: '%s - Adewale Abati',
  link: [
      {
        rel: "canonical",
        content: "https://adewaleabati.com" + path,
      },
      {
        rel: "stylesheet",
        href: "https://github.githubassets.com/assets/gist-embed-d89dc96f3ab6372bb73ee45cafdd0711.css",
        crossorigin: ''
      }
    ],
    meta: [
      {
        name: 'description',
        content: data.value.description
      },
      {
        key: 'og:title',
        property: 'og:title',
        content: data.value.title,
      },
      {
        key: 'og:description',
        property: 'og:description',
        content: data.value.description,
      },
      {
        key: 'og:image',
        property: 'og:image',
        content: "https://res.cloudinary.com/acekyd/image/upload/c_fit,e_colorize:100,g_north_west,l_text:open sans_80:"+ encodeURIComponent(data.value.title) +",w_900,x_60,y_100/v1657896963/blog-thumbnail_plityt.png",
      }
    ],
  script: [
    'https://platform.twitter.com/widgets.js',
  ]
});

</script>