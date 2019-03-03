//this is code from stripe.com/docs
// could not get this to work --- yarn add react-stripe-elements
import React from 'react'
import {CardElement, injectStripe} from 'react-stripe-elements'

export class CheckoutForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      complete: false
    }

    this.submit = this.submit.bind(this)
  }

  async submit(ev) {
    // User clicked submit
    let {token} = await this.props.stripe.createToken({name: 'Name'})
    let response = await fetch('/charge', {
      method: 'POST',
      headers: {'Content-Type': 'text/plain'},
      body: token.id
    })

    if (response.ok) this.setState({complete: true})
  }

  render() {
    return (
      <div className="checkout">
        <br />
        <h3>PAYMENT</h3>

        <div className="card">
          <form action="#">
            <label>Credit Card Number </label>
            <input type="text" name="number" />

            <label>Expiration</label>
            <input type="text" placeholder="MM/YY" name="expiry" />

            <label>Name</label>
            <input type="text" name="name" />

            <label>CVV </label>
            <input type="text" name="cvv" />

            <button type="button" className="btn btn-success">
              Submit
            </button>
            <button type="button" className="btn btn-info">
              Clear
            </button>
          </form>
        </div>

        <CardElement />
        <button type="button" onClick={this.submit}>
          Submit
        </button>
        <br />
      </div>
    )
  }
}

export default injectStripe(CheckoutForm)

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
