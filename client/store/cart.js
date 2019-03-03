import axios from 'axios'
// import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'
const REMOVE_ITEM = 'REMOVE_ITEM'

/**
 * INITIAL STATE
 */
const cartState = {}

/**
 * ACTION CREATORS
 */
const getCartItems = activeCart => ({type: GET_CART, activeCart})
const removeItem = id => ({type: REMOVE_ITEM, id})

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

export const deleteCartItem = productIdToRemove => {
  return async dispatch => {
    try {
      await axios.delete(`/api/cart/${productIdToRemove}`)

      dispatch(fetchCartItems())
    } catch (error) {
      console.error(error)
    }
  }
}

export const updateItemQuantity = (productId, quantity) => {
  return async dispatch => {
    try {
      await axios.put(`/api/cart/${productId}`, quantity)

      dispatch(fetchCartItems())
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
      return action.activeCart
    default:
      return state
  }
}
