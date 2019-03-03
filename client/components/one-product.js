import React from 'react'
import {connect} from 'react-redux'
import {fetchOneProduct, addCartItem, fetchCartItems} from '../store'

class OneProduct extends React.Component {
  constructor(props) {
    super(props)
    this.handleAddToCart = this.handleAddToCart.bind(this)
    this.isUserLoggedIn = this.isUserLoggedIn.bind(this)
    this.redirectToLogin = this.redirectToLogin.bind(this)
  }

  componentDidMount() {
    this.props.fetchProduct()
    this.props.fetchCart()
  }

  handleAddToCart() {
    const productId = this.props.product.id
    console.log(this.props.order)
    const orderId = this.props.order.id

    this.props.addItem({productId, orderId})
  }

  isUserLoggedIn() {
    const user = this.props.user
    if (Object.keys(user).length) return true
    else return false
  }

  redirectToLogin() {
    alert('You must be signed in to shop!')
    const history = this.props.history
    history.push('/login')
  }

  render() {
    const product = this.props.product
    const buttonClickAction = this.isUserLoggedIn()
      ? this.handleAddToCart
      : this.redirectToLogin
    return (
      <div>
        {product.name}
        <button type="button" onClick={buttonClickAction}>
          Add to Cart
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    product: state.product.selectedProduct,
    order: state.cart,
    user: state.user
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OneProduct)
