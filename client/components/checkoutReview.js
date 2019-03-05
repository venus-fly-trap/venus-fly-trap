import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchCartItems, changeOrderToPurchased, createNewCart} from '../store'

class CheckoutReview extends React.Component {
  constructor(props) {
    super(props)

    this.handleCheckoutButton = this.handleCheckoutButton.bind(this)
  }

  componentDidMount() {
    this.props.fetchCart()
  }

  async handleCheckoutButton(evt) {
    console.log('thanks for clicking!')

    await this.props.purchaseOrder(this.props.cart.id)
    console.log('hi')
    await this.props.createNewCart()
    this.props.setStatus('success', 'active')
  }

  render() {
    const cart = this.props.cart.activeCart

    if (cart) {
      const totalPrice = cart.reduce(
        (accum, current) => accum + current.price * current.orderItem.quantity,
        0
      )

      return (
        <div className="cart-container">
          <h1>REVIEW CART</h1>
          <hr />
          {cart.map(item => (
            <div className="cart" key={item.id}>
              <img src={item.imageUrl} />
              <h2>{item.name}</h2>
              <div className="details">
                <b>Price: ${item.price / 100}</b>
                <b>Qty: {item.orderItem.quantity}</b>
                <button
                  className="remove"
                  id={item.id}
                  onClick={this.removeItem}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="cart">
            <b className="right">Total: {totalPrice / 100}</b>
            <div className="details">
              <button
                type="button"
                name="payment"
                className="remove"
                value=""
                onClick={this.props.setStatus}
              >
                Back
              </button>
              <button
                type="button"
                name="success"
                value="active"
                onClick={this.handleCheckoutButton}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )
    } else return <div />
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCart: () => {
      dispatch(fetchCartItems())
    },
    purchaseOrder: cartId => {
      dispatch(changeOrderToPurchased(cartId))
    },
    createNewCart: () => {
      dispatch(createNewCart())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutReview)

//https://bootsnipp.com/snippets/rlKd6
