import React from 'react'
import {connect} from 'react-redux'
import {fetchOneProduct, fetchCartItems, addCartItem, me} from '../store'

class OneProduct extends React.Component {
  constructor(props) {
    super(props)

    this.handleAddToCart = this.handleAddToCart.bind(this)
  }

  componentDidMount() {
    this.props.fetchProduct()
    this.props.getUser()
  }

  handleAddToCart() {
    const productId = this.props.product.id
    const orderId = this.props.cart.id //REPLACE WITH cart !!!!!!
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
    user: state.user,
    cart: state.cart
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchProduct: () => {
      const productId = ownProps.match.params.productId
      dispatch(fetchOneProduct(productId))
    },
    fetchCart: () => {
      dispatch(fetchCartItems())
    },
    addItem: ids => {
      dispatch(addCartItem(ids))
    },
    getUser: () => {
      dispatch(me())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OneProduct)
