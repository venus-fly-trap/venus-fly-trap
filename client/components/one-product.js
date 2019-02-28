import React from 'react'
import {connect} from 'react-redux'
import {fetchOneProduct, addCartItem, fetchOrder} from '../store'

class OneProduct extends React.Component {
  constructor(props) {
    super(props)

    this.handleAddToCart = this.handleAddToCart.bind(this)
  }

  componentDidMount() {
    this.props.fetchProduct()
    this.props.fetchOrder()
  }

  handleAddToCart() {
    const productId = this.props.product.id
    const orderId = this.props.order.id
    console.log(orderId)
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
    order: state.cart.order
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
    fetchOrder: () => {
      dispatch(fetchOrder())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OneProduct)
