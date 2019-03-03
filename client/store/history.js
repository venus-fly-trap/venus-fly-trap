import axios from 'axios'
// import history from '../history'

/**
 * ACTION TYPES
 */
const GET_HISTORY = 'GET_HISTORY'

/**
 * INITIAL STATE
 */
const cartState = []

/**
 * ACTION CREATORS
 */
const getHistory = history => ({type: GET_HISTORY, history})

/**
 * THUNK CREATORS
 */

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
    case GET_HISTORY:
      return {...state, orderHistory: action.history}
    default:
      return state
  }
}
