export function clearLogin (state) {
  state.apiToken = null
  state.name = null
}

export function authorized (state, payload) {
  state.apiToken = payload.apiToken
  state.name = payload.name
}

export function startCall (state) {
  state.activeCall = true
}

export function endCall (state) {
  state.activeCall = false
}
