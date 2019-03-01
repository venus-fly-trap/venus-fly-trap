import axios from 'axios'
// import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'
const GET_HISTORY = 'GET_HISTORY'
const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM'

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

const removeCartItem = productIdToRemove => ({
  type: REMOVE_CART_ITEM,
  roductIdToRemove
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
export default function(state = cartState, action) {
  switch (action.type) {
    case GET_CART:
      return {...state, activeCart: action.activeCart}
    case GET_HISTORY:
      return {...state, orderHistory: action.history}
    case REMOVE_CART_ITEM: {
      //check to make sure i am accessing the combined reducers correctly.
      const updatedCart = state.filter(cartItem => {
        return cartItem.product.id !== action.productIdToRemove
      })
      return {updatedCart}
    }
    default:
      return state
  }
}
