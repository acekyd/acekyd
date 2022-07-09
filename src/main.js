// Import main css
import "~/assets/style/index.scss";

// Import default layout so we don't need to import it to every page
import DefaultLayout from "~/layouts/Default.vue";
import VueDisqus from "vue-disqus";

// Import Fontawesome
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { config, library } from "@fortawesome/fontawesome-svg-core";
import {
  faGithub,
  faTwitter,
  faTwitch,
  faLinkedin,
  faStackOverflow,
  faYoutube
} from "@fortawesome/free-brands-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false;
library.add(
  faGithub,
  faTwitter,
  faTwitch,
  faLinkedin,
  faStackOverflow,
  faYoutube
);

// The Client API can be used here. Learn more: gridsome.org/docs/client-api
export default function(Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component("Layout", DefaultLayout);
  Vue.component("font-awesome", FontAwesomeIcon);
  Vue.use(VueDisqus);

  // Add custom font
  head.link.push({
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Raleway&display=swap",
    rel: "preload",
    as: "style"
  });

  head.meta.push({
    key: "twitter:card",
    name: "twitter:card",
    content: `summary`
  });

  head.meta.push({
    key: "twitter:creator",
    name: "twitter:creator",
    content: `@ace_kyd`
  });

  head.meta.push({
    key: "og:description",
    property: "og:description",
    content: `Adewale "Ace" Abati is a Web Engineer and Developer advocate.`
  });

  head.meta.push({
    key: "og:image",
    property: "og:image",
    content: `https://res.cloudinary.com/acekyd/image/upload/v1657331180/Blog_Image_opnaq4.png`
  });

  head.script.push({ src: "https://platform.twitter.com/widgets.js" });

  router.beforeEach((to, _from, next) => {
    head.meta.push({
      key: "og:url",
      property: "og:url",
      content: process.env.GRIDSOME_BASE_PATH + to.path
    });
    next();
  });
}
