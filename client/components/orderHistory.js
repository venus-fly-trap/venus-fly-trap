import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getOrderHistory} from '../store'

class OrderHistory extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchOrderHistory()
  }

  render() {
    const orderHistory = this.props.orderHistory

    console.log('ORDER HISTORY: ', orderHistory)
    if (orderHistory.length) {
      return (
        <div>
          <div className="orderHistory-container">
            <h1>Order History</h1>
            {orderHistory.map(order => {
              if (order.activeCart) {
                return (
                  <div className="orderItem" key={order.id}>
                    <ul>
                      <li>
                        Items:{' '}
                        {order.activeCart.map(item => item.name).join(', ')}
                      </li>
                      <li>Date: {order.purchaseDate.slice(0, 10)}</li>
                      <li>Shipping Status: {order.shippingStatus}</li>
                      <li>
                        Total Price: ${(order.totalPrice / 100).toFixed(2)}
                      </li>
                    </ul>
                  </div>
                )
              } else return <div />
            })}
          </div>
        </div>
      )
    } else
      return (
        <div className="orderHistory-container">
          <h1>Order History</h1>
          <p>You haven't placed any orders with us yet!</p>
        </div>
      )
  }
}

const mapStateToProps = state => {
  return {
    orderHistory: state.order.orderHistory
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchOrderHistory: () => {
      dispatch(getOrderHistory())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory)
