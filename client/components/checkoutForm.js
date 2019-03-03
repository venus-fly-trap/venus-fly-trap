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
        <p>Would you like to complete the purchase?</p>

        <form action="/charge" method="post" id="payment-form">
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
        </form>
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
