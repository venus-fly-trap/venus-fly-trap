//this is code from stripe.com/docs
// could not get this to work --- yarn add react-stripe-elements
import React from 'react'
import {CardElement, injectStripe} from 'react-stripe-elements'

class CheckoutForm extends React.Component {
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
        <CardElement />
        <button type="button" onClick={this.submit}>
          Send
        </button>
        <br />
        {/* add ternary here to display a message if the payment went through successfully */}
        {this.state.complete
          ? 'Thank you, your payment was successful!'
          : 'Your payment was declined'}
      </div>
    )
  }
}

export default injectStripe(CheckoutForm)
