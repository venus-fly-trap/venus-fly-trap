import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchCartItems, deleteCartItem} from '../store'

class Cart extends React.Component {
  constructor(props) {
    super(props)

    this.removeItem = this.removeItem.bind(this)
  }

  componentDidMount() {
    this.props.fetchCart()
  }

  removeItem(evt) {
    const productId = Number(evt.target.id)
    const orderId = this.props.cart.id

    this.props.deleteCartItem(productId, orderId)
  }

  render() {
    if (this.props.cart.activeCart) {
      const cart = this.props.cart.activeCart
      if (cart.length) {
        const totalPrice = cart.reduce(
          (accum, current) => accum + current.price,
          0
        )
        return (
          <div className="container">
            <h3>CART</h3>
            <table id="cartTable" className="table">
              <thead>
                <tr>
                  <th style={{width: '20%'}}>Product</th>
                  <th style={{width: '2%'}}>Price</th>
                  <th style={{width: '1%'}}>Quantity</th>
                  <th style={{width: '2%'}} />
                </tr>
              </thead>
              <tbody>
                {cart.map(item => (
                  <tr key={item.id}>
                    <td data-th="Product" className="reviewTD">
                      <div className="row">
                        <div className="productImage">
                          <img src={item.imageUrl} />
                        </div>
                        <div id="productName">
                          <h4>{item.name}</h4>
                          <p id="description">{item.description}</p>
                        </div>
                      </div>
                    </td>
                    <td data-th="Price" className="reviewTD reviewData">
                      {item.price / 100}
                    </td>
                    <td data-th="Quantity" className="reviewTD reviewData">
                      <input type="number" defaultValue={item.stock} />
                    </td>
                    <td className="actions" data-th="">
                      <button
                        className="remove"
                        id={item.id}
                        onClick={this.removeItem}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td>
                    <a href="/products" className="btn btn-warning">
                      <button type="button" id="continueButton">
                        {' '}
                        Continue Shopping{' '}
                      </button>
                    </a>
                  </td>
                  <td className="hidden-xs text-center">
                    <strong>Total: {totalPrice / 100}</strong>
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={this.handleCheckoutButton}
                      id="checkOutButton"
                    >
                      Checkout ❯<i className="fa fa-angle-right" />
                    </button>
                  </td>
                </tr>
              </tfoot>
            </table>
            <br />
            <button type="button">
              <Link to="/checkout"> Continue to Checkout </Link>
            </button>
            <br />
          </div>
        )
      } else
        return (
          <div className="container">
            <h3>CART</h3>
            <p>Your cart is empty.</p>
            <a href="/products">
              <button type="button"> Continue Shopping </button>
            </a>
          </div>
        )
    } else
      return (
        <div className="container">
          <h3>CART</h3>
          <p>Your cart is empty.</p>
          <a href="/products">
            <button type="button"> Continue Shopping </button>
          </a>
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
    },
    deleteCartItem: (productId, orderId) => {
      dispatch(deleteCartItem(productId, orderId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
