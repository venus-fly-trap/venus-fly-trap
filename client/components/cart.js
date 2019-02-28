import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchCartItems, fetchOrder} from '../store'

class Cart extends React.Component {
  constructor(props) {
    super(props)

    this.handleRemoveButton = this.handleRemoveButton.bind(this)
  }

  componentDidMount() {
    this.props.fetchOrder()
    this.props.fetchCart(this.props.order.id)
  }

  handleRemoveButton(orderItemId) {
    //this.props.removeOrderItem(orderItemId)
  }

  render() {
    const cart = this.props.cart
    console.log(this.props.order.id)

    return (
      <div>
        {/* {cart.map(orderItem => {
          <h1>test</h1>
        })} */}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart.cartItems,
    order: state.cart.order
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCart: orderId => {
      dispatch(fetchCartItems(orderId))
    },
    fetchOrder: () => {
      dispatch(fetchOrder())
    }
    // removeOrderItem: () => {
    //   dispatch() //TODO check in
    // }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
