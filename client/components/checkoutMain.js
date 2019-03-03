//checkoutMain.js which will hold the cart.js, checkoutForm.js, and checkoutReview.js
//checkout.js is now checkoutReview.js (which kirsten should have changed to on her branch)
//thought i read somewhere that StripeProvider should be on the outermost root of our app... but need to clarify... if its outermost of all payment components or just our overall app

import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Elements, StripeProvider} from 'react-stripe-elements'
import CheckoutForm from './CheckoutForm'
// import {STRIPE_API_KEY} from '../secrets'

class CheckoutMain extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showResults: false
    }
    this.clickHandler = this.clickHandler.bind(this)
  }

  clickHandler() {
    this.setState({showResults: true})
  }

  render() {
    return (
      <div>
        <StripeProvider apiKey="pk_test_TYooMQauvdEDq54NiTphI7jx">
          <div className="checkout">
            <br />
            <Link to="/products"> Back to Shopping </Link>
            <Elements>
              <CheckoutForm />
            </Elements>
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
