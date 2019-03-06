import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  AllProducts,
  OneProduct,
  Cart,
  CheckoutMain,
  CheckoutForm,
  CheckoutReview,
  CheckoutSuccess,
  OrderHistory,
  NoMatch
} from './components'
import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}


        <Route exact path="/" component={UserHome} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/cart" component={Cart} />
        <Route exact path="/products" component={AllProducts} />
        <Route path="/products/:productId" component={OneProduct} />

        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route exact path="/" component={UserHome} />
            <Route path="/home" component={UserHome} />
            <Route path="/checkout" component={CheckoutMain} />
            <Route path="/payment" component={CheckoutForm} />
            <Route path="/review" component={CheckoutReview} />
            <Route path="/confirmation" component={CheckoutSuccess} />
            <Route path="/orders" component={OrderHistory} />
            <Route path="*" component={NoMatch} status={404} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route path="*" component={NoMatch} status={404} />
        {/* <Route component={UserHome} /> */}
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
