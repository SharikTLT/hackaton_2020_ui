import Vue from 'vue'
import Vuex from 'vuex'

// import example from './module-example'
import client from './client'
import attachment from './attachment'
import order from './order'
import myOrder from './myOrder'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      client,
      attachment,
      order,
      myOrder
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })
  window.$$store = Store
  return Store
}
