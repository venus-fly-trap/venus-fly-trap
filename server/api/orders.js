const router = require('express').Router()
const {Order} = require('../db/models')
module.exports = router

//returns all order history -- purchased orders and non purchased aka cart
router.get('/', async (req, res, next) => {
  try {
    const userId = req.user.id

    const allOrders = await Order.findAll({
      where: {
        userId
      }
    })
    res.json(allOrders)
  } catch (error) {
    next(error)
  }
})

//return all order history --- purchased orders
router.get('/history', async (req, res, next) => {
  try {
    // const userId = req.user.id;

    const orderHistory = await Order.findAll({
      where: {
        purchased: true
        // userId
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

    await Order.update(
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
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

//make a new order aka "cart" instance
router.post('/', async (req, res, next) => {
  try {
    const newCart = await Order.create()
    res.json(newCart)

    //do we need to return new cart?? or just res.sendStatus(204)?
  } catch (error) {
    next(error)
  }
})
