import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_SHIPPING = 'GET_SHIPPING'

/**
 * INITIAL STATE
 */
const defaultCheckout = {}

/**
 * ACTION CREATORS
 */
export const getShippingAddress = info => ({
  type: GET_SHIPPING,
  info
})

/**
 * THUNK CREATORS
 */

/**
 * REDUCER
 */
export default function(state = defaultCheckout, action) {
  switch (action.type) {
    case GET_SHIPPING:
      console.log('SHIPPING ATSTORE: ', action.info)
      return action.info
    default:
      return state
  }
}
