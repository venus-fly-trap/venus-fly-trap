//this is code from stripe.com/docs
// could not get this to work --- yarn add react-stripe-elements
import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import store, {showPayment, closePayment} from '../store'

export class CheckoutForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      complete: false
    }
    this.clickHandler = this.clickHandler.bind(this)
  }

  clickHandler() {
    this.props.closePayment()
    this.props.showReview()
  }

  render() {
    return (
      <div className="cart-container">
        <div className="row">
          <div className="col-75">
            <div className="container">
              <form action="/action_page.php">
                <div className="row">
                  <div className="col-50">
                    {' '}
                    <h1>SHIPPING CART </h1>
                    <label htmlFor="fname">
                      <i className="fa fa-user" /> Full Name
                    </label>
                    <input
                      type="text"
                      id="fname"
                      name="firstname"
                      placeholder="Jane M. Doe"
                    />
                    <label htmlFor="email">
                      <i className="fa fa-envelope" /> Email
                    </label>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      defaultValue={this.props.user.email}
                    />
                    <label htmlFor="adr">
                      <i className="fa fa-address-card-o" /> Address
                    </label>
                    <input
                      type="text"
                      id="adr"
                      name="address"
                      placeholder="542 W. 15th Street"
                    />
                    <label htmlFor="city">
                      <i className="fa fa-institution" /> City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      placeholder="New York"
                    />
                    <div className="row">
                      <div className="col-50">
                        <label htmlFor="state">State</label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          placeholder="NY"
                        />
                      </div>
                      <div className="col-50">
                        <label htmlFor="zip">Zip</label>
                        <input
                          type="text"
                          id="zip"
                          name="zip"
                          placeholder="10001"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  name="review"
                  value="active"
                  onClick={() => this.props.setStatus('review', 'active')}
                >
                  Continue
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    payment: state.payment,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    showPayment: () => dispatch(showPayment()),
    closePayment: () => dispatch(closePayment())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm)

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
