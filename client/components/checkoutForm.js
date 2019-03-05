//this is code from stripe.com/docs
// could not get this to work --- yarn add react-stripe-elements
import React from 'react'
import {CardElement, injectStripe} from 'react-stripe-elements'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import store, {showPayment, closePayment} from '../store'
import StripeCheckout from 'react-stripe-checkout'

export class CheckoutForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      complete: false
    }

    // this.submit = this.submit.bind(this)
    this.clickHandler = this.clickHandler.bind(this)
  }

  clickHandler() {
    this.props.closePayment()
    this.props.showReview()
  }

  // STRIPE async submit(ev) {
  //   // User clicked submit
  //   let {token} = await this.props.stripe.createToken({name: 'Name'})
  //   let response = await fetch('/charge', {
  //     method: 'POST',
  //     headers: {'Content-Type': 'text/plain'},
  //     body: token.id
  //   })

  //   if (response.ok) this.setState({complete: true})
  // }

  render() {
    return (
      <div className="checkout">
        <br />
        <h2>Payment Information</h2>
        <br />
        <br />
        <button
          type="button"
          name="review"
          value="active"
          onClick={this.props.setStatus}
        >
          Continue
        </button>
        {/* <CardElement /> */}

        <StripeCheckout
          name="VenusFlyTrap"
          // description={title}
          token={onToken}
          amount={100}
          stripeKey="pk_test_3m2b0a1fAot4GiMEjKhu1fIQ"
        >
          {/* {children || <span {...props} */}
          <span>PURCHASE</span>}
        </StripeCheckout>

        {/* <button type="button" onClick={this.submit}>
          Submit
        </button> */}

        <br />
      </div>

      // <div className="card">
      //   <form action="#">
      //     <label>Credit Card Number </label>
      //     <input type="text" name="number" />

      //     <label>Expiration</label>
      //     <input type="text" placeholder="MM/YY" name="expiry" />

      //     <label>Name</label>
      //     <input type="text" name="name" />

      //     <label>CVV </label>
      //     <input type="text" name="cvv" />

      //     <button type="button" className="btn btn-success">
      //       Submit
      //     </button>
      //     <button type="button" className="btn btn-info">
      //       Clear
      //     </button>
      //   </form>
      // </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    payment: state.payment
  }
}

const mapDispatchToProps = dispatch => {
  return {
    showPayment: () => dispatch(showPayment()),
    closePayment: () => dispatch(closePayment())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
  // mergeProps,
  // {
  //   pure: false
  // }
)(CheckoutForm)

// export default injectStripe(CheckoutForm)

// render() {
//   return (
//     <div className="checkout">
//       <p>Would you like to complete the purchase?</p>
//       <CardElement />

//       <button type="button" onClick={this.submit}>
//         Submit
//       </button>
//       <br />
//       {/* add ternary here to display a message if the payment went through successfully */}
//       {this.state.complete
//         ? 'Thank you, your payment was successful!'
//         : 'Your payment was declined'}
//     </div>
//   )
// }
// }

{
  /* <form action="/charge" method="post" id="payment-form">
<div className="form-row">
  <label className="card-element">Credit or debit card</label>
  <div id="card-element">
    <CardElement />
  </div>
  <div id="card-errors" role="alert">
    {this.state.complete
      ? 'Thank you, your payment was successful!'
      : 'Your payment was declined'}
  </div>
</div>
<button type="button" onClick={this.submit}>
  {' '}
  Submit Payment{' '}
</button>
</form> */
}
