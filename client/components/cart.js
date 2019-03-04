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
    const productId = evt.target.id
    this.props.deleteCartItem(productId)
  }

  render() {
    if (this.props.cart.id) {
      const cart = this.props.cart.activeCart

      return (
        <div>
          <h3>CART</h3>
          {cart.map(cartItem => (
            <div key={cartItem.id}>
              <img src={cartItem.imageUrl} height="300" width="300" />
              <br />
              <h4>
                <Link to={`/products/${cartItem.id}`}>{cartItem.name}</Link>
              </h4>
              <p>Price: ${cartItem.price / 100}</p>
              <p>Quantity: {cartItem.quantity}</p>
              <button
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
    deleteCartItem: productIdToRemove => {
      dispatch(deleteCartItem(productIdToRemove))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
