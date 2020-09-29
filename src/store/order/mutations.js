function insertOrder (orders, order) {
  const existIndex = orders.findIndex(el => el.uuid === order.uuid)
  if (existIndex > -1) {
    orders[existIndex] = order
  } else {
    orders.push(order)
  }
}

export function appendOrders (state, payload) {
  state.myOrderCount = payload.total
  payload.items.forEach(el => {
    insertOrder(state.myOrderList, el)
  })
}
