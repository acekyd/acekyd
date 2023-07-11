// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ["@nuxt/content", "@nuxtjs/tailwindcss", 'nuxt-gtag'],
  css: ["@fortawesome/fontawesome-svg-core/styles.css"],
  tailwindcss: {
    cssPath: "~/assets/css/main.css",
  },
  content: {
    // https://content.nuxtjs.org/api/configuration
    highlight: {
      theme: {
        // Default theme (same as single string)
        default: "material-palenight",
        // Theme used if `html.dark`
        dark: "github-dark",
      },
    },
  },
  gtag: {
    id: 'G-YKDEVD123H',
  }
});
