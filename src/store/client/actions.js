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
/* ,
    response => {
      commit('authorized', response.data.payload)
    },
    (er) => {

    },
    () => {
      commit('endCall')
    } */
}
