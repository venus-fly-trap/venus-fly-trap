const User = require('./user')
const Product = require('./product')
const OrderItem = require('./orderItem')
const Order = require('./order')

Order.belongsTo(User)
User.hasMany(Order)

OrderItem.belongsTo(User)
User.hasMany(OrderItem)

Order.belongsTo(OrderItem)
OrderItem.hasMany(Order)

OrderItem.belongsTo(Product)
Product.hasMany(OrderItem)

// Product.belongsTo(Category)
// Category.hasMany(Product)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Product,
  OrderItem,
  Order
}
