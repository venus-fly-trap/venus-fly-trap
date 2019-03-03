const Sequelize = require('sequelize')
const db = require('../db')
const Product = require('./product')

const Order = db.define(
  'order',
  {
    totalPrice: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    purchased: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    purchaseDate: {
      type: Sequelize.DATE
      //defaultValue: Date.now()
    },
    shippingStatus: {
      type: Sequelize.ENUM('Shipping In Progress', 'Delivered')
      //defaultValue: 'Shipping In Progress'
    }
  },
  {
    defaultScope: {
      include: [{model: Product, as: 'activeCart'}]
    }
  }
)

module.exports = Order
