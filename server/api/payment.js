const router = require('express').Router()
const STRIPE_API_KEY = require('../secrets')
const stripe = require('stripe')(STRIPE_API_KEY)

module.exports = router

// router.use(require("body-parser").text());
//given code, but i think our body-parser will do this already in index.js??? i will leave here incase something breaks...

//POST /api/payment
//takes in credit card information and creates an instance on stripe's database? and charges on their end?
router.post('/payment', async (req, res) => {
  try {
    const amount = req.body.amount
    const currency = req.body.currency
    const description = req.body.description

    let {status} = await stripe.charges.create({
      amount,
      currency,
      description
    })

    res.json({status})
  } catch (err) {
    res.status(500).end()
  }
})
