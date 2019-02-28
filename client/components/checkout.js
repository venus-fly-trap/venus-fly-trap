import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchCartItems} from '../store'

class Checkout extends React.Component {
  constructor(props) {
    super(props)

    this.handleCheckoutButton = this.handleCheckoutButton.bind(this)
  }

  componentDidMount() {
    this.props.fetchCart()
  }

  handleCheckoutButton() {
    const history = this.props.history
    history.push('/pay')
  }

  render() {
    const cart = this.props.cart
    const totalPrice = cart.reduce((accum, current) => accum + current, 0)

    return (
      <div className="container">
        <table id="cart" className="table">
          <thead>
            <tr>
              <th style={{width: '50%'}}>Product</th>
              <th style={{width: '10%'}}>Price</th>
              <th style={{width: '8%'}}>Quantity</th>
              <th style={{width: '22%'}} className="text-center">
                Subtotal
              </th>
              <th style={{width: '10%'}} />
            </tr>
          </thead>
          <tbody>
            {cart.map(item => {
              return (
                <tr key={item.id}>
                  <td data-th="Product">
                    <div className="row">
                      <div className="productImage">
                        <img src={item.imageUrl} />
                      </div>
                      <div>
                        <h4>{item.name}</h4>
                      </div>
                    </div>
                  </td>
                  <td data-th="Price">{item.price / 100}</td>
                  <td data-th="Quantity">
                    <input
                      type="number"
                      className="form-control text-center"
                      value="1"
                    />>
                  </td>
                </tr>
              )
            })}
          </tbody>
          <tfoot>
            <tr>
              <td>
                <a href="/products" className="btn btn-warning">
                  <i className="fa fa-angle-left" /> Continue Shopping
                </a>
              </td>
              <td colSpan="2" className="hidden-xs" />
              <td className="hidden-xs text-center">
                <strong>Total: {totalPrice / 100}</strong>
              </td>
              <td>
                <button
                  type="button"
                  onClick={this.handleCheckoutButton}
                  className="btn btn-success btn-block"
                >
                  Checkout <i className="fa fa-angle-right" />
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
