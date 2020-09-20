
export function getCurrentPack (state) {
  return state.currentPackage
}

export function getById (state, id) {
  return state.packages[id]
}
