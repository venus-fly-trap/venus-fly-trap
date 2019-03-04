import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchCartItems} from '../store'

class CheckoutReview extends React.Component {
  constructor(props) {
    super(props)

    this.handleCheckoutButton = this.handleCheckoutButton.bind(this)
  }

  componentDidMount() {
    this.props.fetchCart()
  }

  handleCheckoutButton() {
    console.log('thanks for clicking!')
    // const history = this.props.history
    // history.push('/pay')
  }

  render() {
    const cart = this.props.cart.activeCart

    if (cart) {
      const totalPrice = cart.reduce(
        (accum, current) => accum + current.price,
        0
      )

      return (
        <div className="container">
          <table id="reviewCart" className="table">
            <thead>
              <tr>
                <th style={{width: '20%'}}>Product</th>
                <th style={{width: '2%'}}>Price</th>
                <th style={{width: '1%'}}>Quantity</th>
                <th style={{width: '2%'}} />
              </tr>
            </thead>
            <tbody>
              {cart.map(item => {
                return (
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
                      {item.stock}
                    </td>
                  </tr>
                )
              })}
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
                    Checkout ❯ <i className="fa fa-angle-right" />
                  </button>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )
    } else return <div />
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

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutReview)

//https://bootsnipp.com/snippets/rlKd6
