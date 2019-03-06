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

    if (orderHistory.length) {
      return (
        <div className="orderHistory-container">
          <h1>Order History</h1>
          {orderHistory.map(order => {
            if (order.activeCart) {
              return (
                <div className="orderItem" key={order.id}>
                  <div className="column">
                    <div>
                      <b>Purchase Date</b>: {order.purchaseDate.slice(0, 10)}
                    </div>
                    <div>
                      <b>Shipping Status</b>: {order.shippingStatus}
                    </div>
                    <div>
                      <b>Total Price</b>: ${(order.totalPrice / 100).toFixed(2)}
                    </div>
                  </div>
                  {order.activeCart.map(item => (
                    <div className="boughtProduct" key={item.id}>
                      <img src={item.imageUrl} />
                      <h3>{item.name}</h3>
                      <div className="details">
                        <b>Qty: {item.orderItem.quantity}</b>
                        <b>Price: ${(item.price / 100).toFixed(2)}</b>
                      </div>
                    </div>
                  ))}
                </div>
              )
            } else return <div />
          })}
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
