const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  purchaseDate: {
    type: Sequelize.DATE
  },
  shippingStatus: {
    type: Sequelize.ENUM('Shipping In Progress', 'Delivered')
  }
})

module.exports = Order
