import axios from 'axios'
// import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const UPDATE_QUANTITY = 'UPDATE_QUANTITY'
const ADD_NEW_CART = 'ADD_NEW_CART'

/**
 * INITIAL STATE
 */
const cartState = {}

/**
 * ACTION CREATORS
 */
const getCart = activeCart => ({type: GET_CART, activeCart})
const addToCart = newCartItem => ({type: ADD_TO_CART, newCartItem})
const removeFromCart = productId => ({type: REMOVE_FROM_CART, productId})
const updateQuantity = quantity => ({type: UPDATE_QUANTITY, quantity})
const addNewCart = newCart => ({type: ADD_NEW_CART, newCart})

/**
 * THUNK CREATORS
 */

export const fetchCartItems = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/cart')

      dispatch(getCart(data))
    } catch (error) {
      console.error(error)
    }
  }
}

//ids are orderId and productId
export const addCartItem = (ids, product) => {
  return async dispatch => {
    try {
      const orderItem = await axios.post('/api/cart', ids)

      product.orderItem = orderItem.data

      dispatch(addToCart(product))
    } catch (error) {
      console.error(error)
    }
  }
}

export const deleteCartItem = (productId, orderId) => {
  return async dispatch => {
    try {
      await axios.delete(`/api/cart/${orderId}/${productId}`)

      dispatch(removeFromCart(productId))
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

export const createNewCart = () => {
  return async dispatch => {
    try {
      const newCart = await axios.post('/api/orders')
      dispatch(addNewCart(newCart.data))
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
    case ADD_TO_CART: {
      const newCartItem = action.newCartItem
      return {...state, activeCart: [...state.activeCart, newCartItem]}
    }
    case REMOVE_FROM_CART: {
      const activeCart = state.activeCart.filter(
        item => item.id !== action.productId
      )
      return {...state, activeCart}
    }
    case UPDATE_QUANTITY:
      return {...state, activeCart: action.activeCart}
    case ADD_NEW_CART:
      return action.newCart
    default:
      return state
  }
}

/*
{
  activeCart: []
}
*/
