import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchCartItems} from '../store'

class Cart extends React.Component {
  constructor(props) {
    super(props)

    this.handleRemoveButton = this.handleRemoveButton.bind(this)
  }

  componentDidMount() {
    this.props.fetchCart()
  }

  handleRemoveButton(orderItemId) {
    //this.props.removeOrderItem(orderItemId)
  }

  render() {
    const cart = this.props.cart

    return (
      <div>
        {/* {console.log("TESTING")} */}
        {cart.map(orderItem => (
          <div key={orderItem.product.id}>
            <img src={orderItem.product.imageUrl} />
            <br />
            <h4>
              <Link to={`/products/${orderItem.product.id}`}>
                {orderItem.product.name}
              </Link>
            </h4>
            <p>Price: ${orderItem.product.price}</p>
            <p>Quantity: {orderItem.quantity}</p>
            <button
              type="button"
              className="remove"
              onClick={() => this.handleRemoveButton(orderItem.product.id)}
            >
              Remove
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
    }
    // removeOrderItem: () => {
    //   dispatch() //TODO check in
    // }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
