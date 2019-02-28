import axios from 'axios'
// import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'
const GET_ORDER = 'GET_ORDER'

/**
 * INITIAL STATE
 */
const cartState = {
  orderItems: [],
  order: {}
}

/**
 * ACTION CREATORS
 */
const getCartItems = cart => ({type: GET_CART, cart})
const getOrder = order => ({type: GET_ORDER, order})

/**
 * THUNK CREATORS
 */

export const fetchCartItems = orderId => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/cart')
      const correctCart = data.filter(item =>
        console.log(orderId, item.orderId)
      )
      console.log(correctCart)
      dispatch(getCartItems(correctCart))
    } catch (error) {
      console.error(error)
    }
  }
}

//ids are orderId and productId
export const addCartItem = ids => {
  return async dispatch => {
    try {
      await axios.post('/api/cart', ids)

      dispatch(fetchCartItems(ids.orderId))
    } catch (error) {
      console.error(error)
    }
  }
}

export const fetchOrder = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/cart/unpurchased')
      dispatch(getOrder(data))
    } catch (error) {
      console.error(error)
    }
  }
}

/**
 * REDUCER
 */
export default function(state = cartState, action) {
  switch (action.type) {
    case GET_CART:
      return {...state, cart: action.cart}
    case GET_ORDER:
      return {...state, order: action.order}
    default:
      return state
  }
}
