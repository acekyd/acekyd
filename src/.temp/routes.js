const c1 = () => import(/* webpackChunkName: "page--src--templates--tag-vue" */ "/Users/acekyd/Documents/www/acekyd/src/templates/Tag.vue")
const c2 = () => import(/* webpackChunkName: "page--src--templates--post-vue" */ "/Users/acekyd/Documents/www/acekyd/src/templates/Post.vue")
const c3 = () => import(/* webpackChunkName: "page--src--pages--talks-vue" */ "/Users/acekyd/Documents/www/acekyd/src/pages/Talks.vue")
const c4 = () => import(/* webpackChunkName: "page--src--pages--posts-vue" */ "/Users/acekyd/Documents/www/acekyd/src/pages/Posts.vue")
const c5 = () => import(/* webpackChunkName: "page--src--pages--projects-vue" */ "/Users/acekyd/Documents/www/acekyd/src/pages/Projects.vue")
const c6 = () => import(/* webpackChunkName: "page--src--pages--cool-stuff-vue" */ "/Users/acekyd/Documents/www/acekyd/src/pages/CoolStuff.vue")
const c7 = () => import(/* webpackChunkName: "page--node-modules--gridsome--app--pages--404-vue" */ "/Users/acekyd/Documents/www/acekyd/node_modules/gridsome/app/pages/404.vue")
const c8 = () => import(/* webpackChunkName: "page--src--pages--index-vue" */ "/Users/acekyd/Documents/www/acekyd/src/pages/Index.vue")

export default [
  {
    path: "/tag/:id/",
    component: c1
  },
  {
    path: "/posts/:title/",
    component: c2
  },
  {
    path: "/talks/",
    component: c3
  },
  {
    path: "/posts/",
    component: c4
  },
  {
    path: "/projects/",
    component: c5
  },
  {
    path: "/cool-stuff/",
    component: c6
  },
  {
    name: "404",
    path: "/404/",
    component: c7
  },
  {
    name: "home",
    path: "/",
    component: c8
  },
  {
    name: "*",
    path: "*",
    component: c7
  }
]
