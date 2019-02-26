const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  purchaseDate: {
    type: Sequelize.DATE,
    defaultValue: Date.now()
  },
  shippingStatus: {
    type: Sequelize.ENUM('Shipping In Progress', 'Delivered'),
    defaultValue: 'Shipping in Progress'
  }
})

module.exports = Order
