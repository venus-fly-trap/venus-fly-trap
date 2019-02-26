const {Order, OrderItem} = require('../db/models')
const router = require('express').Router()

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll()

    res.json(orders)
  } catch (error) {
    next(error)
  }
})

router.get('/:orderId', async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.orderId)

    res.json(order)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newOrder = await Order.create()

    res.json(newOrder)
  } catch (error) {
    next(error)
  }
})
