import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchCartItems} from '../store'

class Cart extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchCart()
  }

  handleClick(orderItemId) {
    event.preventDefault()
    this.props.removeOrderItem(orderItemId)
  }

  render() {
    const cart = this.props.cart

    return (
      <div>
        {/* {console.log("TESTING")} */}
        {cart.map(orderItem => (
          <div key={orderItem.product.id}>
            <img src={orderItem.product.imageUrl} />
            <Link to={`/products/${orderItem.product.id}`}>
              {orderItem.product.name}
            </Link>
            <p>{orderItem.product.price}</p>
            <p>{orderItem.product.quantity}</p>
            <button
              type="submit"
              className="remove"
              onClick={() => this.handleClick(orderItem.product.id)}
            >
              {' '}
              Remove{' '}
            </button>
          </div>
        ))}
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
    removeOrderItem: () => {
      dispatch() //TODO check in
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
