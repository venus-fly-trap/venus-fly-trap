import axios from 'axios'
// import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ORDERS = 'GET_ORDERS'
const UPDATE_ORDERS = 'UPDATE_ORDERS'
const ADD_NEW_CART = 'NEW_CART'

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
const updateOrders = () => ({type: UPDATE_ORDERS})
const addNewCart = newCart => ({type: ADD_NEW_CART, newCart})

/**
 * THUNK CREATORS
 */

export const getOrderHistory = () => {
  return async dispatch => {
    try {
      const orderHistory = await axios.get('/api/orders/history')
      dispatch(getOrders(orderHistory))
    } catch (error) {
      console.error(error)
    }
  }
}

//update order history with purchases as true
export const updateOrderHistory = cartId => {
  return async dispatch => {
    try {
      await axios.update('/api/orders', cartId)
      dispatch(updateOrders())
    } catch (error) {
      console.error(error)
    }
  }
}

export const createNewOrder = () => {
  return async dispatch => {
    try {
      const newCart = await axios.post('/api/orders') //necesesary to pass something through?? like req.body? we just want a empty order instance with default values right?
      dispatch(addNewCart(newCart))
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
      return {...state, orderState: action.orderHistory}
    case ADD_NEW_CART:
      return {...state, orderState: action.newCart}
    default:
      return state
  }
}
