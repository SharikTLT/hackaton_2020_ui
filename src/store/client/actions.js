import api from '../api.js'

export const callLogin = ({ commit, state, dispatch }, payload) => {
  if (state.activeCall) {
    return null
  }
  commit('startCall')
  api('user/login',
    {
      login: payload.login,
      password: payload.password
    },
    response => {
      commit('authorized', response.data.payload)
    },
    (er) => {

    },
    () => {
      commit('endCall')
    })
}
