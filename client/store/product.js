import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_PRODUCT = 'GET_PRODUCT'
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'

/**
 * INITIAL STATE
 */
const defaultProducts = {
  allProducts: [],
  selectedProduct: {}
}

/**
 * ACTION CREATORS
 */
const getOneProduct = product => ({type: GET_PRODUCT, product})
const getAllProducts = products => ({type: GET_ALL_PRODUCTS, products})
const removeProduct = () => ({type: REMOVE_PRODUCT})

/**
 * THUNK CREATORS
 */

export const fetchAllProducts = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/products')
      dispatch(getAllProducts(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const fetchOneProduct = productId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/products/${productId}`)
      dispatch(getOneProduct(data))
    } catch (error) {
      console.error(error)
    }
  }
}

/**
 * REDUCER
 */
export default function(state = defaultProducts, action) {
  switch (action.type) {
    case GET_PRODUCT:
      return {...state, selectedProduct: action.product}
    case GET_ALL_PRODUCTS:
      return {...state, allProducts: action.products}
    default:
      return state
  }
}
