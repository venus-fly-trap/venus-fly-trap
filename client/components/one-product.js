import React from 'react'
import {connect} from 'react-redux'
import {
  fetchOneProduct,
  addCartItem,
  fetchCartItems,
  deleteCartItem
} from '../store'

class OneProduct extends React.Component {
  constructor(props) {
    super(props)
    this.handleAddToCart = this.handleAddToCart.bind(this)
    this.isUserLoggedIn = this.isUserLoggedIn.bind(this)
    this.redirectToLogin = this.redirectToLogin.bind(this)
    this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this)
  }

  componentDidMount() {
    this.props.fetchProduct()
    this.props.fetchCart()
  }

  handleAddToCart() {
    const product = this.props.product
    const productId = this.props.product.id
    const orderId = this.props.order.id

    this.props.addItem({productId, orderId}, product)
  }

  handleRemoveFromCart() {
    const productId = this.props.product.id
    const orderId = this.props.order.id

    this.props.deleteCartItem(productId, orderId)
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
    if (this.props.product.id) {
      const product = this.props.product
      let inCart = []

      if (this.props.order.id) {
        inCart = this.props.order.activeCart.filter(
          item => item.id === product.id
        )
      }

      const buttonClickAction = this.isUserLoggedIn()
        ? this.handleAddToCart
        : this.redirectToLogin

      return (
        <div>
          <div className="detailed-container">
            <img src={product.imageUrl} />
            <div className="about">
              <h1>{product.name}</h1>
              <hr />
              {inCart.length === 0 ? (
                <button type="button" name="add" onClick={buttonClickAction}>
                  Add to Cart
                </button>
              ) : (
                <button
                  type="button"
                  className="remove"
                  onClick={this.handleRemoveFromCart}
                >
                  Remove from Cart
                </button>
              )}
              <p>
                <b>Stock</b>: {product.stock}
              </p>
              <p>
                <b>Price</b>: ${product.price / 100}
              </p>
              <p>
                <b>Description</b>:
              </p>
              {product.description}
            </div>
          </div>
        </div>
      )
    } else {
      return <div />
    }
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
    addItem: (ids, product) => {
      dispatch(addCartItem(ids, product))
    },
    deleteCartItem: (productId, orderId) => {
      dispatch(deleteCartItem(productId, orderId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OneProduct)
