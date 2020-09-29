
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ],
    meta: {
      public: false,
      onlyWhenLoggedOut: true
    }
  },
  // {
  //   path: '/app/order',
  //   component: () => import('layouts/MainLayout.vue'),
  //   children: [
  //     { path: '/create', component: () => import('pages/CreateOrder.vue') }
  //   ],
  //   meta: {
  //     public: false,
  //     onlyWhenLoggedOut: false
  //   }
  // },
  {
    path: '/app',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/App.vue') },
      { name: 'viewAllOrders', path: 'order/view/all', component: () => import('pages/ViewAllOrders.vue') },
      { name: 'viewOrder', path: 'order/view/:id', component: () => import('pages/ViewOrder.vue') },
      { path: 'order/create', component: () => import('pages/CreateOrder.vue') }
    ],
    meta: {
      public: false,
      onlyWhenLoggedOut: false
    }
  },
  {
    path: '/login',
    component: () => import('layouts/PublicLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Login.vue') }
    ],
    meta: {
      public: true,
      onlyWhenLoggedOut: true
    }
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
