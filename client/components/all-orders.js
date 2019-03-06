import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getOrderHistory} from '../store'

class AllOrders extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchOrderHistory()
  }

  render() {
    const orderHistory = this.props.orderHistory

    console.log('ORDER HISTORY: ', orderHistory)

    return (
      <div>
        <div className="orderHistory-container">
          <h1>Order History</h1>
          {orderHistory.map((order, id) => (
            <ul key={id}>
              <li>Date: {order.purchaseDate}</li>
              <li>Shipping Status: {order.shippingStatus}</li>
              <li>Total Price: {order.totalPrice}</li>
            </ul>
          ))}
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(AllOrders)
