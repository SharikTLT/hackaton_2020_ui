export default function () {
  return {
    activeCall: false,
    apiToken: localStorage.getItem('apiToken') || null,
    name: null
  }
}
