import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  Router.beforeEach((to, from, next) => {
    try {
      const isPublic = to.matched.some(record => record.meta.public)
      const onlyWhenLoggedOut = to.matched.some(record => record.meta.onlyWhenLoggedOut)
      const token = localStorage.getItem('apiToken')
      const loggedIn = token !== undefined && token !== null

      if (to.path === '/') {
        console.log('to app')
        return next('/app')
      }

      if (!isPublic && !loggedIn) {
        console.log('to login')
        return next({
          path: '/login',
          query: { redirect: to.fullPath }// Store the full path to redirect the user to after login
        })
      }
      // Do not allow user to visit login page or register page if they are logged in
      if (loggedIn && onlyWhenLoggedOut) {
        console.log('logged move to root')
        return next('/app')
      }
      console.log('ok next route')
      return next()
    } catch (e) {
      console.log('Error on route', e)
    }
  })

  window.$$router = Router
  return Router
}
