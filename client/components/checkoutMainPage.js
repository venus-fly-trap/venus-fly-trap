//checkoutMain.js which will hold the cart.js, checkoutForm.js, and checkoutReview.js
//checkout.js is now checkoutReview.js (which kirsten should have changed to on her branch)
//thought i read somewhere that StripeProvider should be on the outermost root of our app... but need to clarify... if its outermost of all payment components or just our overall app

import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import CheckoutForm from './checkoutFormPage'
import CheckoutReview from './checkoutReviewPage'
import CheckoutSuccess from './checkoutSuccessPage'
import store, {showPayment, closePayment} from '../store'

// import {STRIPE_API_KEY} from '../secrets'

class CheckoutMain extends Component {
  constructor(props) {
    super(props)
    this.state = {
      status: 'payment',
      payment: '',
      review: '',
      success: ''
    }
    this.setStatus = this.setStatus.bind(this)
  }

  setStatus(name, value, back) {
    let step
    if (!back) step = this.state.status
    else step = back

    this.setState({
      status: name,
      [step]: value
    })
  }

  render() {
    const isPaymentActive = this.state.payment
    const isReviewActive = this.state.review

    return (
      <div>
        {/* <StripeProvider apiKey="pk_test_TYooMQauvdEDq54NiTphI7jx"> */}
        <div className="checkout">
          {/* <br /> */}
          <div className="container">
            <ul className="progressbar">
              <li className="active">Cart</li>
              <li className={isPaymentActive}>Shipping</li>
              <li className={isReviewActive}>Review Order</li>
              <li className={isReviewActive}>Confirmation</li>
            </ul>
          </div>
          {/* <br />
            <br /> */}
          <div className="container">
            <Link to="/products">
              <button type="button">Back to Shopping</button>
            </Link>
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
          {(() => {
            switch (this.state.status) {
              case 'payment':
                return (
                  <CheckoutForm
                    setStatus={this.setStatus}
                    status={this.state.status}
                  />
                )
              case 'review':
                return (
                  <CheckoutReview
                    setStatus={this.setStatus}
                    status={this.state.status}
                  />
                )
              case 'success':
                return <CheckoutSuccess history={this.props.history} />
              default:
                return (
                  <CheckoutForm
                    setStatus={this.setStatus}
                    status={this.state.status}
                  />
                )
            }
          })()}
          {/*
            {/* // }
            // {this.state.displayReview ?  : null}
            // {this.state.displaySuccess ? <CheckoutSuccess /> : null}
            // <Elements>
            //   <CheckoutForm />
            // </Elements>
            // </Switch> */}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    payment: state.payment,
    review: state.review
  }
}

const mapDispatchToProps = dispatch => {
  return {
    showPayment: () => dispatch(showPayment()),
    closePayment: () => dispatch(closePayment())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutMain)

//can delete after:
//default test key provide from stripe: pk_test_TYooMQauvdEDq54NiTphI7jx

// {STRIPE_API_KEY}
{
  /* <input type="submit" value="Continue to Checkout" onClick={this.clickHandler} />
{this.state.showResults ? <CheckoutForm /> : null} */
}
