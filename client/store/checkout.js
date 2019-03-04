import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const SHOW_PAYMENT = 'SHOW_PAYMENT'
const SHOW_REVIEW = 'SHOW_REVIEW'
const SHOW_SUCCESS = 'SHOW_SUCCESS'
const CLOSE_PAYMENT = 'CLOSE_PAYMENT'
// const CLOSE_REVIEW = 'CLOSE_REVIEW'
// const CLOSE_SUCCESS = 'CLOSE_SUCCESS'

/**
 * INITIAL STATE
 */
const defaultCheckout = {
  payment: 'active',
  review: false,
  success: false
}

/**
 * ACTION CREATORS
 */
export const showPayment = () => ({
  type: SHOW_PAYMENT
})

const showReview = () => ({
  type: SHOW_REVIEW
})

const showSuccess = () => ({
  type: SHOW_SUCCESS
})

export const closePayment = () => ({
  type: CLOSE_PAYMENT
})

// const closeReview = () => ({
// type: CLOSE_REVIEW
// })

// const closeSuccess = () => ({
// type: CLOSE_SUCCESS
// })
/**
 * THUNK CREATORS
 */

// export const fetchAllProducts = () => {

// }

/**
 * REDUCER
 */
export default function(state = defaultCheckout, action) {
  switch (action.type) {
    case SHOW_PAYMENT:
      return {...state, payment: true}
    case CLOSE_PAYMENT:
      return {...state, payment: false}
    default:
      return state
  }
}
