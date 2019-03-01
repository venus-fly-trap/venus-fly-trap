import React from 'react'
import {connect} from 'react-redux'
import {fetchOneProduct, addCartItem, fetchCartItems} from '../store'

class OneProduct extends React.Component {
  constructor(props) {
    super(props)

    this.handleAddToCart = this.handleAddToCart.bind(this)
  }

  componentDidMount() {
    this.props.fetchProduct()
    this.props.fetchCart()
  }

  handleAddToCart() {
    const productId = this.props.product.id
    const orderId = this.props.order.id
    this.props.addItem({productId, orderId})
  }

  render() {
    const product = this.props.product

    return (
      <div>
        {product.name}
        <button onClick={this.handleAddToCart}>Add to Cart</button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    product: state.product.selectedProduct,
    order: state.cart.activeCart
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchProduct: () => {
      const productId = ownProps.match.params.productId
      dispatch(fetchOneProduct(productId))
    },
    addItem: ids => {
      dispatch(addCartItem(ids))
    },
    fetchCart: () => {
      dispatch(fetchCartItems())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OneProduct)
