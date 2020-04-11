export default [
  {
    path: "/tag/:id/",
    component: () => import(/* webpackChunkName: "page--src--templates--tag-vue" */ "/Users/adewaleabati/Documents/code/acekyd/src/templates/Tag.vue")
  },
  {
    path: "/posts/:title/",
    component: () => import(/* webpackChunkName: "page--src--templates--post-vue" */ "/Users/adewaleabati/Documents/code/acekyd/src/templates/Post.vue")
  },
  {
    path: "/talks/",
    component: () => import(/* webpackChunkName: "page--src--pages--talks-vue" */ "/Users/adewaleabati/Documents/code/acekyd/src/pages/Talks.vue")
  },
  {
    path: "/projects/",
    component: () => import(/* webpackChunkName: "page--src--pages--projects-vue" */ "/Users/adewaleabati/Documents/code/acekyd/src/pages/Projects.vue")
  },
  {
    name: "404",
    path: "/404/",
    component: () => import(/* webpackChunkName: "page--node-modules--gridsome--app--pages--404-vue" */ "/Users/adewaleabati/Documents/code/acekyd/node_modules/gridsome/app/pages/404.vue")
  },
  {
    name: "home",
    path: "/",
    component: () => import(/* webpackChunkName: "page--src--pages--index-vue" */ "/Users/adewaleabati/Documents/code/acekyd/src/pages/Index.vue")
  },
  {
    name: "*",
    path: "*",
    component: () => import(/* webpackChunkName: "page--node-modules--gridsome--app--pages--404-vue" */ "/Users/adewaleabati/Documents/code/acekyd/node_modules/gridsome/app/pages/404.vue")
  }
]

