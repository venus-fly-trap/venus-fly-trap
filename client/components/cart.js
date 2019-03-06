import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchCartItems, deleteCartItem, updateItemQuantity} from '../store'

class Cart extends React.Component {
  constructor(props) {
    super(props)

    this.removeItem = this.removeItem.bind(this)
    this.changeQuantity = this.changeQuantity.bind(this)
  }

  componentDidMount() {
    this.props.fetchCart()
  }

  removeItem(evt) {
    const productId = Number(evt.target.id)
    const orderId = this.props.cart.id

    this.props.deleteCartItem(productId, orderId)
  }

  changeQuantity(evt) {
    if (evt.target.value > evt.target.max) {
      this.setState()
    } else if (evt.target.value < evt.target.min) {
      this.setState()
    } else {
      this.props.updateQuantity()
    }
  }

  render() {
    if (this.props.cart.activeCart) {
      const cart = this.props.cart.activeCart
      if (cart.length) {
        const totalPrice =
          cart.reduce(
            (accum, current) =>
              accum + current.price * current.orderItem.quantity,
            0
          ) / 100
        return (
          <div className="cart-container">
            <h1>CART</h1>
            <hr />
            {cart.map(item => (
              <div className="cart" key={item.id}>
                <Link to={`/products/${item.id}`}>
                  <img src={item.imageUrl} />
                  <h2>{item.name}</h2>
                </Link>
                <div className="details">
                  <b>Price: ${item.price / 100}</b>
                  <b>
                    Qty:{' '}
                    <input
                      type="number"
                      value={item.orderItem.quantity}
                      onChange={console.log('input changed')}
                      min="1"
                      max={item.stock}
                    />
                  </b>
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
            <div className="cart-bottom">
              <b className="right">Total: ${totalPrice.toFixed(2)}</b>
              <div className="details">
                <Link to="/products">
                  <button type="button">Continue Shopping</button>
                </Link>
                <Link to="/checkout">
                  <button type="button">Checkout</button>
                </Link>
              </div>
            </div>
          </div>
        )
      } else
        return (
          <div className="cart-container">
            <h1>CART</h1>
            <div className="cart">
              <h3>Your cart is empty.</h3>
            </div>
            <Link to="/products">
              <button type="button"> Continue Shopping </button>
            </Link>
          </div>
        )
    } else
      return (
        <div className="cart-container">
          <h1>CART</h1>
          <div className="cart">
            <h3>Your cart is empty.</h3>
          </div>
          <Link to="/products">
            <button type="button"> Continue Shopping </button>
          </Link>
        </div>
      )
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
    },
    updateQuantity: (productId, quantity) => {
      dispatch(updateItemQuantity(productId, quantity))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
