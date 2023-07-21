<template>
  <div>
    <Head>
      <Link rel="alternate" type="application/rss+xml" title="RSS Feed" href="/rss.xml" />
    </Head>
    <NuxtPage />
  </div>
</template>
<script setup lang="ts">
useSeoMeta({
  title: 'Adewale Abati - Web Engineer & Developer Advocate',
  ogTitle: 'Adewale Abati - Web Engineer & Developer Advocate',
  description: 'Adewale "Ace" Abati is a Web Engineer, Developer Advocate, Open Sourcer and Youtuber.',
  ogDescription: 'Adewale "Ace" Abati is a Web Engineer, Developer Advocate, Open Sourcer and Youtuber.',
  ogImage: 'https://res.cloudinary.com/acekyd/image/upload/v1657331180/Blog_Image_opnaq4.png',
  twitterCard: 'summary_large_image',
  twitterCreator: '@ace_kyd',

})
</script>
