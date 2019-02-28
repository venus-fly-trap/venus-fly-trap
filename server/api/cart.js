const router = require('express').Router()
const {Order, OrderItem, Product} = require('../db/models')
module.exports = router

//for showing OrderItems in cart
router.get('/unpurchased', async (req, res, next) => {
  try {
    const userId = req.user.id

    const cartItems = await Order.findOne({
      where: {
        purchased: false,
        userId
      }
    })

    res.json(cartItems)
  } catch (error) {
    next(error)
  }
})

//orderItems for cart
router.get('/', async (req, res, next) => {
  try {
    const cartItems = await OrderItem.findAll()

    res.json(cartItems)
  } catch (error) {
    next(error)
  }
})

//add to cart
router.post('/', async (req, res, next) => {
  try {
    const productId = req.body.productId
    const orderId = req.body.orderId

    const cartItem = await OrderItem.create({productId, orderId})
    res.json(cartItem)
  } catch (error) {
    next(error)
  }
})

//for order history
router.get('/history', async (req, res, next) => {
  try {
    const userId = req.user.id

    const cartItems = await Order.findAll({
      where: {
        purchased: true,
        userId
      }
    })

    res.json(cartItems)
  } catch (error) {
    next(error)
  }
})
