import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'

/**
 * INITIAL STATE
 */
const cart = []

/**
 * ACTION CREATORS
 */
const getCartItems = cart => ({type: GET_CART, cart})

const addToCart = item => ({type: ADD_TO_CART, item})

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

export const addCartItem = ids => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/cart', ids)
      dispatch(addToCart(data))
    } catch (error) {
      console.error(error)
    }
  }
}

/**
 * REDUCER
 */
export default function(state = cart, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart
    case ADD_TO_CART:
      return [...state, action.item]
    default:
      return state
  }
}
