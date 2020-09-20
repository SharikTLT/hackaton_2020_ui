
export function updatePackage (state, payload) {
  state.currentPackage = {
    ...state.currentPackage,
    files: payload.files,
    state: payload.state
  }
  state.packages[payload.id] = state.currentPackage
}

export function updatePackageRemote (state, payload) {
  state.currentPackage = {
    ...state.currentPackage,
    state: payload.status,
    remoteId: payload.uuid
  }

  state.packages[state.currentPackage.id] = state.currentPackage
}
