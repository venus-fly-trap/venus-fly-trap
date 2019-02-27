const router = require('express').Router()
const {OrderItem, Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const cartItems = await OrderItem.findAll(
      {
        include: [Product]
      },
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
    console.log(req.body)
    const cartItem = await OrderItem.create(req.body)

    res.json(cartItem)
  } catch (error) {
    next(error)
  }
})
