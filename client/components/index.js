/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'

export {default as AllProducts} from './all-products'
export {default as OneProduct} from './one-product'
export {default as Cart} from './cart'
export {default as CheckoutMain} from './checkoutMainPage'
export {default as CheckoutPayment} from './checkoutFormPage'
export {default as CheckoutReview} from './checkoutReviewPage'
export {default as CheckoutSuccess} from './checkoutSuccessPage'
export {default as OrderHistory} from './orderHistory'
export {default as NoMatch} from './404page'
