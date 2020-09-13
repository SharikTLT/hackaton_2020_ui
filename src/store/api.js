import axios from 'axios'

export function api (method, payload, onSuccess, onError, onFinally) {
  axios.post({
    method: 'POST',
    url: 'http://localhost:8080/' + method,
    data: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
      Token: window.$$store.user.token || ''
    },
    json: true
  })
    .then(response => {
      onSuccess(response)
    }).catch((err) => {
      console.error(err)
      onError(err)
    }).finally(() => {
      onFinally()
    })
}

export default api
