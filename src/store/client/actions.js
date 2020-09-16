export const callLogin = ({ commit, state, dispatch, store, Vue }, payload) => {
  if (state.activeCall) {
    return null
  }
  commit('startCall')
  window.$$store.$api.post('user/login', {
    login: payload.login,
    password: payload.password
  }).then(res => {
    if (res.data.success) {
      commit('authorized', res.data.payload)
      localStorage.setItem('apiToken', res.data.payload.token)
      // window.$$router.push({ path: window.$$router.history.current.query.redirect || '/' }, onComplete => { }, onAbort => { })
      window.$$router.push({ path: window.$$router.history.current.query.redirect || '/' })
    }
  }).finally(() => {
    commit('endCall')
  })
}

export const loadModules = ({ commit }) => {
  window.$$store.$api.get('user/modules')
    .then(res => {
      commit('modulesLoaded', res.data.payload)
    })
}

export const logout = ({ commit }) => {
  localStorage.removeItem('apiToken')
  window.$$router.go('/')
}
