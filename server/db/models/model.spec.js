/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')
const Order = db.model('order')
const OrderItem = db.model('orderModel')
const Product = db.model('product')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody

      beforeEach(async () => {
        cody = await User.create({
          username: 'cody',
          email: 'cody@puppybook.com',
          password: 'bones'
        })
      })

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false)
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')

describe('Order model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
}) //end describe ('Order model')

describe('OrderItem model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
}) //end describe ('OrderItem model')

describe('Product model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
}) //end describe ('Product model')
