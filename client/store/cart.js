import axios from 'axios'
// import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'
const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM'

/**
 * INITIAL STATE
 */
const cart = []

/**
 * ACTION CREATORS
 */
const getCartItems = cart => ({
  type: GET_CART,
  cart
})

const removeCartItem = productIdToRemove => ({
  type: REMOVE_CART_ITEM,
  productIdToRemove
})

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
      const {data} = await axios.delete(`/api/cart/${productIdToRemove}`)
      dispatch(removeCartItem(data))
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
    case REMOVE_CART_ITEM: {
      //check to make sure i am accessing the combined reducers correctly.
      const updatedCart = state.filter(cartItem => {
        return cartItem.product.id !== action.productIdToRemove
      })
      return updatedCart
    }
    default:
      return state
  }
}
