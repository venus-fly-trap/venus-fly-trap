const router = require('express').Router()

const {Order, OrderItem, Product} = require('../db/models')
module.exports = router

//our cart w/ unpurchased items. Is an object
router.get('/', async (req, res, next) => {
  try {
    const userId = req.user.id

    const cart = await Order.findOne({
      where: {
        purchased: false,
        userId
      }
    })
    res.json(cart)
  } catch (error) {
    next(error)
  }
})

//adds to cart
router.post('/', async (req, res, next) => {
  try {
    const productId = req.body.productId
    const orderId = req.body.orderId
    const quantity = req.body.quantity

    const cartItem = await OrderItem.create({productId, orderId})

    res.json(cartItem)
  } catch (error) {
    next(error)
  }
})

router.put('/:productId', async (req, res, next) => {
  try {
    await OrderItem.update(
      {
        quantity: this.quantity++
      },
      {
        where: {
          productId: req.params.productId
        }
      }
    )

    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

//utility function for delete route
function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.redirect('/login')
  }
}

//delete an item on the current cart
router.delete('/:productId', checkAuthentication, async (req, res, next) => {
  try {
    await OrderItem.destroy({
      where: {
        productId: req.params.productId
      }
    })

    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

//for order history w/ purchased items
router.get('/history', async (req, res, next) => {
  try {
    const userId = req.user.id

    const cartItems = await Order.findAll(
      {
        include: [{model: Product, as: 'activeCart'}]
      },
      {
        where: {
          purchased: true,
          userId
        }
      }
    )

    res.json(cartItems)
  } catch (error) {
    next(error)
  }
})
