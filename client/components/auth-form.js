import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {auth} from '../store'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  if (displayName === 'Login') {
    return (
      <div>
        <form onSubmit={handleSubmit} name={name}>
          <div>
            <label htmlFor="email">
              <small>Email</small>
            </label>
            <input name="email" type="text" />
          </div>
          <div>
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input name="password" type="password" />
          </div>
          <div>
            <button type="submit">{displayName}</button>{' '}
            <button type="button" className="googleOAuth">
              <a href="/auth/google">{displayName} with Google</a>
            </button>{' '}
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
        <p>
          <button type="button">
            <a href="/signup">Click Here to Sign Up!</a>
          </button>
        </p>

        <div className="landing-page">
          <img src="https://www.bunnings.com.au/-/media/au/diy-advice-house/articles/garden/planters/how%20to%20keep%20potted%20plants%20in%20great%20condition/how%20to%20keep%20potted%20plants%20in%20great%20condition_header.jpg" />
          <div className="promotionDiv">
            <h4 className="promotion">This week only, BOGO!</h4>
            <br />
            <button type="button" className="btn">
              {' '}
              <Link to="/products" className="link">
                {' '}
                SHOP{' '}
              </Link>{' '}
            </button>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <form onSubmit={handleSubmit} name={name}>
          <div>
            <label htmlFor="email">
              <small>Email</small>
            </label>
            <input name="email" type="text" />
          </div>
          <div>
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input name="password" type="password" />
          </div>
          <div>
            <button type="submit">{displayName}</button>{' '}
            <button type="button" className="googleOAuth">
              <a href="/auth/google">{displayName} with Google</a>
            </button>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </form>

        <div className="landing-page">
          <img src="https://www.bunnings.com.au/-/media/au/diy-advice-house/articles/garden/planters/how%20to%20keep%20potted%20plants%20in%20great%20condition/how%20to%20keep%20potted%20plants%20in%20great%20condition_header.jpg" />
          <h4 className="promotion">This week only, BOGO!</h4>
          <br />
          <button type="button" className="btn">
            {' '}
            <Link to="/products" className="link">
              {' '}
              SHOP{' '}
            </Link>{' '}
          </button>
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
