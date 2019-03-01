const router = require('express').Router()
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc') //update the secret key, probably want to refactor and store this secret key in a separate file and include it in .gitignore
module.exports = router

// router.use(require("body-parser").text());
//given code, but i think our body-parser will do this already in index.js??? i will leave here incase something breaks...

router.post('/charge', async (req, res) => {
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
