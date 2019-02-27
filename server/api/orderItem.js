const router = require('express').Router()
const {OrderItem} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const cartItems = await OrderItem.findAll({
      where: {
        purchased: false
      }
    })
    res.json(cartItems)
  } catch (error) {
    next(error)
  }
})
