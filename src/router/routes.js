
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/IndexPage.vue') },
      { path: 'spiderweb', component: () => import('pages/Spider.vue') },
      { path: 'balken', component: () => import('pages/Balken.vue') },
      { path: 'bubble', component: () => import('pages/Bubble.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
