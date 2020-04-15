// Import main css
import '~/assets/style/index.scss'

// Import default layout so we don't need to import it to every page
import DefaultLayout from '~/layouts/Default.vue'
import VueDisqus from 'vue-disqus'


// Import Fontawesome
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { config, library } from '@fortawesome/fontawesome-svg-core'
import { faGithub, faTwitter, faTwitch, faLinkedin, faStackOverflow, faYoutube } from '@fortawesome/free-brands-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css'

config.autoAddCss = false;
library.add(faGithub, faTwitter, faTwitch, faLinkedin, faStackOverflow, faYoutube)

// The Client API can be used here. Learn more: gridsome.org/docs/client-api
export default function (Vue, { router, head, isClient }) {

  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
  Vue.component('font-awesome', FontAwesomeIcon)
  Vue.use(VueDisqus)


  // Add custom font
  head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css?family=Fira+Mono'
  })

  head.meta.push({
    key: 'og:description',
    name: 'og:description',
    content: `Adewale Abati a.k.a. Ace is a web developer, developer advocate, open sourcer and youtuber from Lagos, Nigeria`,
  })

  head.meta.push({
    key: 'twitter:description',
    name: 'twitter:description',
    content: `Adewale Abati a.k.a. Ace is a web developer, developer advocate, open sourcer and youtuber from Lagos, Nigeria`,
  })

  head.meta.push({
    key: 'og:image',
    name: 'og:image',
    content: `https://res.cloudinary.com/acekyd/image/upload/v1535314894/e4f91d37-026a-44d0-91ea-b26cfdaa34a7-f0f2f48b-59bc-41b8-bfc1-aa25dbed1c36-v1_njbqpt.png`,
  })

  head.meta.push({
    key: 'twitter:image',
    name: 'twitter:image',
    content: `https://res.cloudinary.com/acekyd/image/upload/v1535314894/e4f91d37-026a-44d0-91ea-b26cfdaa34a7-f0f2f48b-59bc-41b8-bfc1-aa25dbed1c36-v1_njbqpt.png`,
  })

  router.beforeEach((to, _from, next) => {
    head.meta.push({
      key: 'og:url',
      name: 'og:url',
      content: process.env.GRIDSOME_BASE_PATH + to.path,
    })
    next()
  })

}