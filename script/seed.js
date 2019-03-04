'use strict'

const db = require('../server/db')
const {User, Product, Order} = require('../server/db/models')

const products = [
  {
    name: 'Jade',
    description:
      'Crassula ovata, commonly known as jade plant, lucky plant, money plant or money tree, is a succulent plant with small pink or white flowers. It is native to South Africa and Mozambique, and is common as a houseplant worldwide.',
    imageUrl: 'https://i.imgur.com/7bKsgIq.png',
    price: 525
  },
  {
    name: 'Paddle',
    description:
      'What is a paddle plant? Also known as flapjack paddle plant (Kalanchoe thyrsiflora), this succulent kalanchoe plant has with thick, rounded, paddle-shaped leaves. The plant is also known as red pancake because the leaves frequently take on a reddish or deep pink tint during the winter.',
    imageUrl: 'https://i.imgur.com/bjQWuJs.png',
    price: 525
  },
  {
    name: 'Green Prince',
    description:
      'Succulent Echeveria Green Prince. Very royal. Requires pampering, and always be sure to address it as Your Majesty.',
    imageUrl: 'https://i.imgur.com/qM8yorU.png',
    price: 525
  },
  {
    name: 'Snake Plant',
    description:
      "Viper's Bowstring Hemp- Sansevieria trifasciata is a species of flowering plant in the family Asparagaceae, native to tropical West Africa from Nigeria east to the Congo. It is most commonly known as the snake plant, mother-in-law's tongue, and viper's bowstring hemp, among other names",
    imageUrl: 'https://i.imgur.com/GW4YIdA.png',
    price: 525
  },
  {
    name: 'Flat Cactus',
    description: 'This cactus is pretty flat.',
    imageUrl: 'https://i.imgur.com/QEPBkmZ.png',
    price: 525
  },
  {
    name: 'Spiral Cactus',
    description:
      'This plant likes piña cooladas, and getting caught in the rain. It is not into yoga and it has half a brain. It also loves making love at midnight in the dunes on the cape. It is definitely the one you have been looking for.',
    imageUrl: 'https://i.imgur.com/ZyUFsHz.png',
    price: 525
  },
  {
    name: 'Paddle Blue Pot',
    description:
      'Will raise me up? Will you help me down? Will you get me right out of this godforsaken town? Will you make it all a little less cold? (I can do that, oh ohhh yeah I can do that)',
    imageUrl: 'https://i.imgur.com/h77fA3S.png',
    price: 525
  },
  {
    name: 'Green Prince Pink Pot',
    description:
      "Will you cater to every fantasy I got? Will you hose me down with holy water if I get to hot (hot)? Will you take me places I've never known? (I can do that, oh ohhh yeah I can do that)",
    imageUrl: 'https://i.imgur.com/5In3LIi.png',
    price: 525
  },
  {
    name: 'Green Prince White Pot',
    description:
      "I know the territory, I've been around, it'll all turn to dust and we'll all fall down. Sooner or later you'll be screwin around (I won't do that, no nooo I won't do that)",
    imageUrl: 'https://i.imgur.com/Wj3YGNw.png',
    price: 525
  }
]

const users = [
  {
    username: 'cody',
    password: '123',
    email: 'cody@email.com'
  },
  {
    username: 'lily',
    password: '123',
    email: 'lily@email.com'
  },
  {
    username: 'marilyn',
    password: '123',
    email: 'marilyn@email.com'
  },
  {
    username: 'kirsten',
    password: '123',
    email: 'kirsten@email.com'
  },
  {
    username: 'jamila',
    password: '123',
    email: 'jamila@email.com'
  }
]

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  await Promise.all(
    users.map(user => {
      return User.create(user)
    })
  )

  const createdUsers = await User.findAll()

  await Promise.all(
    createdUsers.map(user => {
      return Order.create({userId: user.id})
    })
  )

  await Promise.all(
    products.map(product => {
      return Product.create(product)
    })
  )

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${users.length} orders`)
  console.log(`seeded ${products.length} products`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
