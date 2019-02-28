const Sequelize = require('sequelize')
const db = require('../db')
const Product = require('./product')

const OrderItem = db.define('orderItem', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  price: {
    type: Sequelize.INTEGER
  }
})

module.exports = OrderItem
