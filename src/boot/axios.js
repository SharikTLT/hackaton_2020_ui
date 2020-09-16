import Vue from 'vue'
import axios from 'axios'

Vue.prototype.$axios = axios

export default async ({ router, Vue, redirect, store }) => {
  const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
  Vue.config.productionTip = false

  Vue.prototype.$api = api
  store.$api = api

  api.defaults.timeout = 10000
  api.interceptors.request.use(
    config => {
      const token = localStorage.getItem('apiToken')
      console.log('intercept with ', token)
      if (token) {
        config.headers.common['Api-Token'] = token
      }
      return config
    },
    error => {
      return Promise.reject(error)
    }
  )
  api.interceptors.response.use(
    response => {
      if (response.status === 200 || response.status === 201) {
        return Promise.resolve(response)
      } else {
        return Promise.reject(response)
      }
    }, error => {
      if (error.response.status) {
        switch (error.response.status) {
          case 400:
            break
          case 401:
            break
          case 403:
            router.replace({
              path: '/login',
              query: { redirect: router.currentRoute.fullPath }
            })
            break
          case 404:
            break
          case 502:
            setTimeout(() => {
              router.replace({
                path: '/login',
                query: {
                  redirect: router.currentRoute.fullPath
                }
              })
            }, 1000)
        }
        return Promise.reject(error.response)
      }
    }
  )
}
