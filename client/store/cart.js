import axios from 'axios'
// import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'
const GET_HISTORY = 'GET_HISTORY'

/**
 * INITIAL STATE
 */
const cartState = {
  activeCart: {},
  orderHistory: []
}

/**
 * ACTION CREATORS
 */
const getCartItems = activeCart => ({type: GET_CART, activeCart})
const getHistory = history => ({type: GET_HISTORY, history})

/**
 * THUNK CREATORS
 */

export const fetchCartItems = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/cart')

      dispatch(getCartItems(data))
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

      dispatch(fetchCartItems())
    } catch (error) {
      console.error(error)
    }
  }
}

export const fetchCartHistory = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/cart/history')

      dispatch(getHistory(data))
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
      return {...state, activeCart: action.activeCart}
    case GET_HISTORY:
      return {...state, orderHistory: action.history}
    default:
      return state
  }
}
