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
        { name: 'theme-color', content: '#ffffff', media: '(prefers-color-scheme: light)' },
        { name: 'theme-color', content: '#09090b', media: '(prefers-color-scheme: dark)' },
        { name: 'msapplication-TileColor', content: '#0d9e78' },
        { name: 'author', content: 'Adewale Abati' },
        { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/logo.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap' }
      ],
      script: [
        {
          // Set the theme class before first paint to avoid a flash of the wrong theme.
          innerHTML: `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;var e=document.documentElement;e.classList.toggle('dark',d);e.style.colorScheme=d?'dark':'light';}catch(e){}})();`,
          tagPriority: 'critical'
        }
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
      routes: ['/rss.xml', '/sitemap.xml', '/llms.txt'],
    },
  },
  
  // Runtime config for environment variables
  runtimeConfig: {
    // Private runtime config (server-side only)
    // Netlify: set these in Site settings → Environment variables
    notion: {
      // IMPORTANT:
      // Do NOT read secrets via `process.env.*` here — Nuxt/Nitro can inline them into the built server bundle.
      // Instead, provide safe defaults and override at runtime via env vars:
      // - NUXT_NOTION__TOKEN
      // - NUXT_NOTION__LINKS_DATABASE_ID
      token: '',
      linksDatabaseId: '',
      // Seconds (not secret)
      linksCacheMaxAge: 600,
      linksCacheStaleMaxAge: 3600
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
