<template>
  <div>
    <Head>
      <Link rel="alternate" type="application/rss+xml" title="RSS Feed" href="/rss.xml" />
      <Link rel="canonical" :href="canonicalUrl" />
      <Script type="application/ld+json">
        {{
          {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Adewale Abati",
            "alternateName": "Ace",
            "jobTitle": "Staff Developer Advocate",
            "worksFor": {
              "@type": "Organization",
              "name": "Block"
            },
            "url": "https://adewaleabati.com",
            "sameAs": [
              "https://github.com/acekyd",
              "https://twitter.com/ace_kyd",
              "https://linkedin.com/in/acekyd",
              "https://youtube.com/acekydtv"
            ],
            "image": "https://res.cloudinary.com/acekyd/image/upload/v1657331180/Blog_Image_opnaq4.png",
            "description": "Web Engineer and Staff Developer Advocate passionate about AI, open source, and community building."
          }
        }}
      </Script>
    </Head>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
const { $router } = useNuxtApp()
const route = useRoute()

const canonicalUrl = computed(() => {
  const baseUrl = 'https://adewaleabati.com'
  return `${baseUrl}${route.path}`
})

useSeoMeta({
  title: 'Adewale Abati - Web Engineer & Developer Advocate',
  ogTitle: 'Adewale Abati - Web Engineer & Developer Advocate',
  description: 'Web Engineer and Staff Developer Advocate at Block, passionate about AI, open source, and building inclusive tech communities.',
  ogDescription: 'Web Engineer and Staff Developer Advocate at Block, passionate about AI, open source, and building inclusive tech communities.',
  ogImage: 'https://res.cloudinary.com/acekyd/image/upload/v1657331180/Blog_Image_opnaq4.png',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  twitterCard: 'summary_large_image',
  twitterCreator: '@ace_kyd',
  twitterSite: '@ace_kyd',
  colorScheme: 'light dark',
  themeColor: '#12b488'
})
</script>
