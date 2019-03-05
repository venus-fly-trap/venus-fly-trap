const router = require('express').Router()
const {Order} = require('../db/models')
module.exports = router

//return all order history --- purchased orders
router.get('/history', async (req, res, next) => {
  try {
    const userId = req.user.id

    const orderHistory = await Order.findAll({
      where: {
        purchased: true,
        userId
      }
    })
    res.json(orderHistory)
  } catch (error) {
    next(error)
  }
})

//returns and finds a specific order
router.get('/:orderId', async (req, res, next) => {
  try {
    const userId = req.user.id

    const order = await Order.findOne({
      where: {
        id: req.params.orderId,
        userId
      }
    })
    res.json(order)
  } catch (error) {
    next(error)
  }
})

//update order history when new purchase is made
router.put('/', async (req, res, next) => {
  try {
    const userId = req.user.id
    const updatedOrder = await Order.update(
      {
        purchased: true
      },
      {
        where: {
          purchased: false,
          userId
        }
      }
    )
    res.status(204).json(updatedOrder)
  } catch (error) {
    next(error)
  }
})

//make a new order aka "cart" instance
router.post('/', async (req, res, next) => {
  try {
    const userId = req.user.id

    const newCart = await Order.create(userId)
    res.json(newCart)
  } catch (error) {
    next(error)
  }
})
