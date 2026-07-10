<template>
  <div class="container-content py-10 md:py-14">
    <nav class="mb-8 flex items-center gap-2 text-sm text-ink-faint" aria-label="Breadcrumb">
      <NuxtLink to="/" class="no-underline transition-colors hover:text-ink">Home</NuxtLink>
      <span class="text-ink-faint/50">/</span>
      <NuxtLink to="/posts" class="no-underline transition-colors hover:text-ink">Blog</NuxtLink>
      <span class="text-ink-faint/50">/</span>
      <span class="truncate text-ink">{{ data?.title }}</span>
    </nav>

    <article>
      <header class="mb-8 border-b border-border pb-8">
        <div v-if="data?.date || data?.tags?.length" class="mb-3 flex flex-wrap items-center gap-3 text-xs text-ink-faint">
          <time v-if="data?.date" :datetime="data.date">{{ getDate(data.date) }}</time>
          <span v-if="data?.tags?.length" class="flex flex-wrap gap-1.5">
            <span v-for="tag in data.tags" :key="tag" class="rounded-full border border-border px-2 py-0.5">{{ tag }}</span>
          </span>
        </div>
        <h1 class="text-3xl font-bold tracking-tight text-ink md:text-4xl">{{ data?.title }}</h1>
        <p v-if="data?.description" class="mt-3 text-lg text-ink-faint">{{ data.description }}</p>
      </header>

      <div class="content-body prose prose-lg dark:prose-invert">
        <ContentDoc>
          <template #not-found>
            <h2>Ooops! Looks like that document doesn't exist.</h2>
          </template>
        </ContentDoc>
      </div>

      <footer class="mt-12 border-t border-border pt-8">
        <NuxtLink to="/posts" class="text-sm font-medium text-accent no-underline">← Back to all posts</NuxtLink>
        <div class="mt-8">
          <DisqusComments :identifier="path" />
        </div>
      </footer>
    </article>
  </div>
</template>

<script setup>
const { path } = useRoute();
const cleanedPath = path.replace(/\/$/, '') // temporary hack for trailing slashes.

const { data } = await useAsyncData(`content-${cleanedPath}`, () => {
  return queryContent().where({ _path: cleanedPath }).findOne()
});

// If the post doesn't exist, render a proper 404 instead of crashing on data.value.*
if (!data.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found', fatal: true })
}

// Externally-hosted posts are stubs — send visitors straight to the original.
if (data.value.external_url) {
  await navigateTo(data.value.external_url, { external: true, redirectCode: 301 })
}

// Handle canonical URL logic
const getCanonicalUrl = () => {
  if (data.value.canonical_url === true || data.value.canonical_url === undefined) {
    return "https://adewaleabati.com" + path;
  } else if (typeof data.value.canonical_url === 'string') {
    return data.value.canonical_url;
  } else {
    return null;
  }
};

const canonicalUrl = getCanonicalUrl();
// Prefer the post's own cover image for social sharing; fall back to the generated title card.
const cover = resolveCover(data.value);
const coverAbs = cover ? (cover.startsWith('http') ? cover : 'https://adewaleabati.com' + cover) : null;
const ogImage = coverAbs || ("https://res.cloudinary.com/acekyd/image/upload/c_fit,e_colorize:100,g_north_west,l_text:open sans_80:" + encodeURIComponent(data.value.title) + ",w_900,x_60,y_100/v1657896963/blog-thumbnail_plityt.png");

useHead({
  titleTemplate: '%s - Adewale Abati',
  link: [
    ...(canonicalUrl ? [{ rel: "canonical", href: canonicalUrl }] : []),
    {
      rel: "stylesheet",
      href: "https://github.githubassets.com/assets/gist-embed-d89dc96f3ab6372bb73ee45cafdd0711.css",
      crossorigin: ''
    }
  ],
  script: [
    'https://platform.twitter.com/widgets.js',
  ]
});

useSeoMeta({
  title: data.value.title,
  description: data.value.description,
  ogTitle: data.value.title,
  ogDescription: data.value.description,
  ogType: 'article',
  ogUrl: 'https://adewaleabati.com' + path,
  ogImage,
  // Remove the global 1200x630 dimensions — they describe the homepage
  // fallback image, not this post's cover.
  ogImageWidth: null,
  ogImageHeight: null,
  articlePublishedTime: data.value.date,
  articleAuthor: ['Adewale Abati'],
  articleTag: data.value.tags,
  twitterCard: 'summary_large_image',
  twitterImage: ogImage,
});

// Article structured data for richer search/agent understanding.
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: data.value.title,
        description: data.value.description,
        datePublished: data.value.date,
        dateModified: data.value.updated || data.value.date,
        author: {
          '@type': 'Person',
          name: 'Adewale Abati',
          url: 'https://adewaleabati.com',
          sameAs: [
            'https://github.com/acekyd',
            'https://twitter.com/ace_kyd',
            'https://linkedin.com/in/acekyd',
            'https://youtube.com/@acekydtv',
          ],
        },
        mainEntityOfPage: 'https://adewaleabati.com' + path,
        image: ogImage,
      }),
    },
  ],
});
</script>
