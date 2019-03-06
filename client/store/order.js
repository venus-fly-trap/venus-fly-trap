import axios from 'axios'
// import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ORDERS = 'GET_ORDERS'
const PURCHASE_ORDER = 'PURCHASE_ORDER'

/**
 * INITIAL STATE
 */
const orderState = {
  orderHistory: [],
  selectedOrder: {}
}

/**
 * ACTION CREATORS
 */
const getOrders = orderHistory => ({type: GET_ORDERS, orderHistory})
const purchaseOrder = order => ({type: PURCHASE_ORDER, order})

/**
 * THUNK CREATORS
 */

export const getOrderHistory = () => {
  return async dispatch => {
    try {
      const orderHistory = await axios.get('/api/orders/history')
      dispatch(getOrders(orderHistory.data))
    } catch (error) {
      console.error(error)
    }
  }
}

//update order history with purchases as true
export const changeOrderToPurchased = (cartId, price) => {
  return async dispatch => {
    try {
      const purchaseInfo = {
        id: cartId,
        shippingStatus: 'Shipping In Progress',
        purchaseDate: Date(Date.now()),
        totalPrice: price,
        purchased: true
      }
      const order = await axios.put('/api/orders', purchaseInfo)
      dispatch(purchaseOrder(order.data))
    } catch (error) {
      console.error(error)
    }
  }
}

/**
 * REDUCER
 */
export default function(state = orderState, action) {
  switch (action.type) {
    case GET_ORDERS:
      return {...state, orderHistory: action.orderHistory}
    case PURCHASE_ORDER:
      return {...state, orderHistory: [...state.orderHistory, action.order]}
    default:
      return state
  }
}
