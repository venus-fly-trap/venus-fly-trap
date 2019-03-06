//this is code from stripe.com/docs
// could not get this to work --- yarn add react-stripe-elements
import React from 'react'
import {connect} from 'react-redux'
import store, {getShippingAddress} from '../store'

export class CheckoutForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: this.props.user.email,
      address: '',
      city: '',
      state: '',
      zip: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.setStatus('review', 'active')
    this.props.sendShippingInfo(this.state)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <div className="cart-container">
        <div className="row">
          <div className="col-75">
            <div className="container">
              <form onSubmit={this.handleSubmit}>
                <div className="row">
                  <div className="col-50">
                    {' '}
                    <h1> SHIPPING ADDRESS </h1>
                    <label htmlFor="fname">
                      <i className="fa fa-user" /> Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Jane M. Doe"
                      onChange={this.handleChange}
                    />
                    <label htmlFor="email">
                      <i className="fa fa-envelope" /> Email
                    </label>
                    <input
                      type="text"
                      name="email"
                      defaultValue={this.props.user.email}
                      onChange={this.handleChange}
                    />
                    <label htmlFor="adr">
                      <i className="fa fa-address-card-o" /> Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      placeholder="542 West 15th Street"
                      onChange={this.handleChange}
                    />
                    <label htmlFor="city">
                      <i className="fa fa-institution" /> City
                    </label>
                    <input
                      type="text"
                      name="city"
                      placeholder="New York"
                      onChange={this.handleChange}
                    />
                    <div className="row">
                      <div className="col-50">
                        <label htmlFor="state">State</label>
                        <input
                          type="text"
                          name="state"
                          placeholder="NY"
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="col-50">
                        <label htmlFor="zip">Zip</label>
                        <input
                          type="text"
                          name="zip"
                          placeholder="10001"
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <button type="submit" name="review" value="active">
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
    sendShippingInfo: info => dispatch(getShippingAddress(info))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm)
