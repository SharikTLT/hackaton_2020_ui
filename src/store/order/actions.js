export function create (context, payload) {
  return window.$$store.$api.promise('order/create',
    {
      langFrom: payload.languageFrom,
      langTo: payload.languageTo,
      pages: payload.pages,
      filePackageOriginals: payload.filePackageOriginals
    })
}

export function view (context, payload) {
  return window.$$store.$api.promise('order/view/' + payload.id)
}
