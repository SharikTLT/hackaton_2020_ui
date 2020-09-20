
export function updatePackage ({ commit }, payload) {
  commit('updatePackage', payload)
}

export function upload ({ commit, state }, payload) {
  const formData = new FormData()
  formData.append('id', state.currentPackage.remoteId || 'new')
  state.currentPackage.files.forEach(element => {
    formData.append('files', element)
  })
  window.$$store.$api.post('attachment/upload', formData)
    .then((res) => {
      commit('updatePackageRemote', res.data.payload)
    })
}
