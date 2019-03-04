//checkoutMain.js which will hold the cart.js, checkoutForm.js, and checkoutReview.js
//checkout.js is now checkoutReview.js (which kirsten should have changed to on her branch)
//thought i read somewhere that StripeProvider should be on the outermost root of our app... but need to clarify... if its outermost of all payment components or just our overall app

import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Elements, StripeProvider} from 'react-stripe-elements'
import CheckoutForm from './CheckoutForm'
import CheckoutReview from './CheckoutReview'
import CheckoutSuccess from './CheckoutSuccess'

// import {STRIPE_API_KEY} from '../secrets'

class CheckoutMain extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayPayment: 'active',
      displayReview: '',
      displaySuccess: ''
    }
    this.displayCart = this.displayCart.bind(this)
    this.displayPayment = this.displayPayment.bind(this)
    this.displayReview = this.displayReview.bind(this)
    this.displaySuccess = this.displaySuccess.bind(this)
  }

  displayCart() {
    const history = this.props.history
    history.push('/cart')
  }

  displayPayment() {
    this.setState({
      displayPayment: 'active',
      displayReview: '',
      displaySuccess: ''
    })
  }

  displayReview() {
    this.setState({
      displayPayment: 'active',
      displayReview: 'active',
      displaySuccess: ''
    })
  }

  displaySuccess() {
    this.setState({
      displayPayment: 'active',
      displayReview: 'active',
      displaySuccess: 'active'
    })
  }

  render() {
    const isPaymentActive = this.state.displayPayment
    const isReviewActive = this.state.displayReview
    const isSuccessActive = this.state.displaySuccess
    return (
      <div>
        <StripeProvider apiKey="pk_test_TYooMQauvdEDq54NiTphI7jx">
          <div className="checkout">
            {/* <br /> */}
            <div className="container">
              <ul className="progressbar">
                <li onClick={this.displayCart} className="active">
                  Cart
                </li>
                <li onClick={this.displayPayment} className={isPaymentActive}>
                  Payment
                </li>
                <li onClick={this.displayReview} className={isReviewActive}>
                  Review Order
                </li>
                <li onClick={this.displaySuccess} className={isSuccessActive}>
                  Confirmation
                </li>
              </ul>
            </div>
            {/* <br />
            <br /> */}
            <div className="container">
              <button type="button">
                {' '}
                <Link to="/products"> Back to Shopping </Link>{' '}
              </button>
              {/* <button type="button">
                {' '}
                <Link to="/cart"> Edit Cart </Link>{' '}
              </button>
              <button type="button" onClick={this.displayReview}>
                {' '}
                <Link to="/review"> Review Order </Link>{' '}
              </button>
              <button type="button" onClick={this.displayReview}>
                {' '}
                Finalize Order{' '}
              </button> */}
            </div>
            {/* <br /> */}
            {/* {this.state.displayPayment ? <CheckoutForm /> : null} */}
            {this.state.displayReview ? <CheckoutReview /> : null}
            {this.state.displaySuccess ? <CheckoutSuccess /> : null}
            <Elements>
              <CheckoutForm />
            </Elements>
            <button type="button">
              {' '}
              <h3 onClick={this.displayReview}> Checkout </h3>{' '}
            </button>
          </div>
        </StripeProvider>
      </div>
    )
  }
}

export default CheckoutMain

//can delete after:
//default test key provide from stripe: pk_test_TYooMQauvdEDq54NiTphI7jx

// {STRIPE_API_KEY}
{
  /* <input type="submit" value="Continue to Checkout" onClick={this.clickHandler} />
{this.state.showResults ? <CheckoutForm /> : null} */
}
