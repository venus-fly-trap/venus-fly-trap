const router = require('express').Router()
const {OrderItem, Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const cartItems = await OrderItem.findAll(
      // {
      //   include: [Product]
      // },
      {
        where: {
          purchased: false
        }
      }
    )

    res.json(cartItems)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const productId = req.body.productId
    const userId = req.body.userId
    const cartItem = await OrderItem.create({productId, userId})
    res.json(cartItem)
  } catch (error) {
    next(error)
  }
})
