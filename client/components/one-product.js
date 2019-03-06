import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  fetchOneProduct,
  addCartItem,
  fetchCartItems,
  deleteCartItem
} from '../store'
import toastr from 'toastr'

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
    let orderId
    if (this.props.order) {
      orderId = this.props.order.id
    } else orderId = 0

    this.props.addItem({productId, orderId}, product)

    toastr.options = {
      closeButton: true,
      debug: false,
      newestOnTop: false,
      progressBar: false,
      positionClass: 'toast-bottom-left',
      preventDuplicates: false,
      onclick: null,
      showDuration: '300',
      hideDuration: '1000',
      timeOut: '5000',
      extendedTimeOut: '1000',
      showEasing: 'swing',
      hideEasing: 'linear',
      showMethod: 'fadeIn',
      hideMethod: 'fadeOut'
    }
    toastr.success('Product added to cart.', 'Success!')
  }

  handleRemoveFromCart() {
    const productId = this.props.product.id
    const orderId = this.props.order.id

    this.props.deleteCartItem(productId, orderId)

    toastr.options = {
      closeButton: true,
      debug: false,
      newestOnTop: false,
      progressBar: false,
      positionClass: 'toast-bottom-left',
      preventDuplicates: false,
      onclick: null,
      showDuration: '300',
      hideDuration: '1000',
      timeOut: '5000',
      extendedTimeOut: '1000',
      showEasing: 'swing',
      hideEasing: 'linear',
      showMethod: 'fadeIn',
      hideMethod: 'fadeOut'
    }
    toastr.error('Product removed from cart.', 'Success!')
  }

  isUserLoggedIn() {
    const user = this.props.user
    if (Object.keys(user).length) return true
    else return false
  }

  redirectToLogin() {
    // alert('You must be signed in to shop!')
    toastr.options = {
      closeButton: true,
      debug: false,
      newestOnTop: false,
      progressBar: false,
      positionClass: 'toast-bottom-left',
      preventDuplicates: false,
      onclick: null,
      showDuration: '300',
      hideDuration: '1000',
      timeOut: '5000',
      extendedTimeOut: '1000',
      showEasing: 'swing',
      hideEasing: 'linear',
      showMethod: 'fadeIn',
      hideMethod: 'fadeOut'
    }
    toastr.warning('You must be signed in to shop!', 'Notice:')

    const history = this.props.history
    history.push('/login')
  }

  render() {
    if (this.props.product.id) {
      const product = this.props.product
      let inCart = []

      if (this.props.order.activeCart) {
        inCart = this.props.order.activeCart.filter(
          item => item.id === product.id
        )
      } else inCart = []

      const buttonClickAction = this.isUserLoggedIn()
        ? this.handleAddToCart
        : this.redirectToLogin

      return (
        <div>
          <div className="detailed-container">
            <Link to="/products" className="link">
              <b>
                {'⇦ '}
                <u>Return to Store</u>
              </b>
            </Link>
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
