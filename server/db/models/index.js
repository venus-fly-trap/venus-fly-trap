
const User = require('./User')
const Order = require('./Order')
const OrderItem = require('./OrderItem')
const Product = require('./product')

Order.belongsTo(User)
User.hasMany(Order)

OrderItem.belongsTo(Order)
Order.hasMany(OrderItem)

module.exports = {
  User,
  Order,
  OrderItem,
  Product
}
