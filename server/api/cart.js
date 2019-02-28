const router = require('express').Router()
const {Order, OrderItem} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    //const orderId

    const cartItems = await OrderItem.findAll({
      where: {
        //orderId
      }
    })

    res.json(cartItems)
  } catch (error) {
    next(error)
  }
})

//add to cart
router.post('/', async (req, res, next) => {
  try {
    const productId = req.body.productId
    // const userId = req.user.id
    //use orderId
    const cartItem = await OrderItem.create({productId, userId})
    res.json(cartItem)
  } catch (error) {
    next(error)
  }
})

//utility function for delete route
function isAuthenticated(req, res, next) {
  if (req.user.authenticated) {
    return next()
  }
  res.redirect('/')
}

//delete an item on the current cart
router.delete('/:productId', isAuthenticated, async (req, res, next) => {
  try {
    await OrderItem.destroy({
      where: {
        product: {
          id: req.params.id
        }
      }
    }) //please check if I am picturing the orderItem db table correctly
  } catch (error) {
    next(error)
  }
})

//grab order history
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
