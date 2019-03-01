import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchCartItems, deleteCartItem} from '../store'

class Cart extends React.Component {
  constructor(props) {
    super(props)

    this.removeHandler = this.removeHandler.bind(this)
  }

  componentDidMount() {
    this.props.fetchCart()
  }

  removeHandler(productIdToRemove) {
    this.props.deleteCartItem(productIdToRemove)
  }

  render() {
    const cart = this.props.cart
    return (
      <div>
        {/* cart.map(cartItem => (
          <div key={cartItem.id}>
            <img src={cartItem.product.imageUrl} />
            <br />
            <h4>
              <Link to={`/products/${cartItem.product.id}`}>
                {cartItem.product.name}
              </Link>
            </h4>
            <p>Price: ${cartItem.product.price / 100}</p>
            <p>Quantity: {cartItem.quantity}</p>
            <button
              type="button"
              className="remove"
              onClick={() => this.removeHandler(cartItem.product.id)}
            >
              Remove
            </button>
          </div>
        ))} */}
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
    deleteCartItem: productIdToRemove => {
      dispatch(deleteCartItem(productIdToRemove))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
