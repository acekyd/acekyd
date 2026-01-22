// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ["@nuxt/content", "@nuxtjs/tailwindcss", 'nuxt-gtag', 'nuxt-disqus'],
  css: ["@fortawesome/fontawesome-svg-core/styles.css"],
  
  // App configuration
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#12b488' },
        { name: 'msapplication-TileColor', content: '#12b488' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/logo.png' }
      ]
    }
  },
  
  // Tailwind CSS configuration
  tailwindcss: {
    cssPath: "~/assets/css/main.css",
  },
  
  // Content module configuration
  content: {
    highlight: {
      theme: {
        default: "material-theme-palenight",
        dark: "github-dark",
      },
    },
    markdown: {
      anchorLinks: false
    }
  },
  
  // Analytics
  gtag: {
    id: 'G-YKDEVD123H',
    config: {
      anonymize_ip: true,
      send_page_view: true
    }
  },
  
  // Comments
  disqus: {
    shortname: "acekyd-github"
  },
  
  // Nitro configuration for static generation
  nitro: {
    prerender: {
      routes: ['/rss.xml', '/sitemap.xml'],
    },
  },
  
  // Runtime config for environment variables
  runtimeConfig: {
    // Private runtime config (server-side only)
    // Netlify: set these in Site settings → Environment variables
    notion: {
      token: process.env.NOTION_TOKEN,
      linksDatabaseId: process.env.NOTION_LINKS_DATABASE_ID,
      // Seconds
      linksCacheMaxAge: Number(process.env.NOTION_LINKS_CACHE_MAX_AGE || 600),
      linksCacheStaleMaxAge: Number(process.env.NOTION_LINKS_CACHE_STALE_MAX_AGE || 3600)
    },
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://adewaleabati.com'
    }
  },
  
  // Performance optimizations
  experimental: {
    payloadExtraction: false
  }
});
