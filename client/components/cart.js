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
    if (this.props.cart.id) {
      const cart = this.props.cart.activeCart

      return <div>{cart.map(orderItem => <h1>{orderItem.name}</h1>)}</div>
    }
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart.activeCart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCart: () => {
      dispatch(fetchCartItems())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
