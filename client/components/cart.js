import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchCartItems, deleteCartItem} from '../store'

class Cart extends React.Component {
  constructor(props) {
    super(props)

    this.removeItem = this.removeItem.bind(this)
  }

  componentDidMount() {
    this.props.fetchCart()
  }

  removeItem(evt) {
    const productId = Number(evt.target.id)
    const orderId = this.props.cart.id

    this.props.deleteCartItem(productId, orderId)
  }

  render() {
    if (this.props.cart.id) {
      const cart = this.props.cart.activeCart
      if (cart.length) {
        return (
          <div className="cart-container">
            <h3>CART</h3>
            {cart.map(cartItem => (
              <div key={cartItem.id} className="cart-products">
                <img src={cartItem.imageUrl} height="300" width="300" />
                <br />
                <h4>
                  <Link to={`/products/${cartItem.id}`}>{cartItem.name}</Link>
                </h4>
                <p>Price: ${cartItem.price / 100}</p>
                <p>Quantity: {cartItem.orderItem.quantity}</p>
                <button
                  type="button"
                  className="remove"
                  id={cartItem.id}
                  onClick={this.removeItem}
                >
                  Remove
                </button>
              </div>
            ))}
            <br />
            <button type="button">
              <Link to="/checkout"> Continue to Checkout </Link>
            </button>
            <br />
          </div>
        )
      } else
        return (
          <div id="cart">
            <h3>CART</h3>
            <p>Your cart is currently empty.</p>
            <a href="/products">
              <button type="button"> Continue Shopping </button>
            </a>
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
    deleteCartItem: (productId, orderId) => {
      dispatch(deleteCartItem(productId, orderId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
