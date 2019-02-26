const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

//default route is /api/user
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email', 'username']
    })

    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId)

    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newUser = await User.create(req.body)

    res.json(newUser)
  } catch (err) {
    next(err)
  }
})

router.put('/:userId', async (req, res, next) => {
  try {
    const user = await User.update(req.body, {
      where: {
        id: req.params.userId
      }
    })

    res.json(user)
  } catch (err) {
    next(err)
  }
})

// destroy user, order, and order items
// router.delete('/:userId', async (req, res, next) => {
//   try {
//     const Order = await Order.destroy(
//       {
//         where: {
//           id: req.params.userId
//       }
//     })

//     res.json(user)
//   } catch(err) {
//     next(err)
//   }
// })
