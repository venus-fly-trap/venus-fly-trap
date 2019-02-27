import React from 'react'
import {connect} from 'react-redux'
import {fetchOneProduct, addCartItem, me} from '../store'

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
    const userId = this.props.user.id
    this.props.addItem({productId, userId})
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
    user: state.user
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
    getUser: () => {
      dispatch(me())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OneProduct)
