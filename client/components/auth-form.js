import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {auth} from '../store'

/**
 * COMPONENT
 */
class AuthForm extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      interactedWith: {
        email: false,
        password: false
      }
    }
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.isEmailValid = this.isEmailValid.bind(this)
    this.doFieldsHaveErrors = this.doFieldsHaveErrors.bind(this)
    this.shouldTheFieldMarkError = this.shouldTheFieldMarkError.bind(this)
    this.handleBlurWhenInteracting = this.handleBlurWhenInteracting.bind(this)
    this.variablesForRender = this.variablesForRender.bind(this)
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value})
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value})
  }

  isEmailValid() {
    const {email} = this.state
    return email.includes('@') && email.includes('.')
  }

  doFieldsHaveErrors() {
    const {password} = this.state
    return {
      email: this.isEmailValid() === false,
      password: password.length === 0
    }
  }

  shouldTheFieldMarkError(field) {
    const errors = this.doFieldsHaveErrors()
    const hasError = errors[field]
    const shouldDisplayError = this.state.interactedWith[field]

    return hasError ? shouldDisplayError : false
  }

  handleBlurWhenInteracting(field) {
    return () => {
      this.setState({
        interactedWith: {...this.state.interactedWith, [field]: true}
      })
    }
  }

  variablesForRender() {
    const isButtonWorking = !Object.values(this.doFieldsHaveErrors()).includes(
      true
    )
    const errorDisplay = this.shouldTheFieldMarkError
    const isEmailWarningDisplayed = this.shouldTheFieldMarkError('email')
      ? 'errorWarning'
      : 'hidden'
    const isPasswordWarningDisplayed = this.shouldTheFieldMarkError('password')
      ? 'errorWarning'
      : 'hidden'

    return {
      isButtonWorking,
      errorDisplay,
      isEmailWarningDisplayed,
      isPasswordWarningDisplayed
    }
  }

  render() {
    const {name, displayName, handleSubmit, error} = this.props
    const {
      isButtonWorking,
      errorDisplay,
      isEmailWarningDisplayed,
      isPasswordWarningDisplayed
    } = this.variablesForRender()

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
            <a href="/signup">
              <button type="button">Click Here to Sign Up!</button>
            </a>
          </p>
          <div className="landing-page">
            <img src="https://i.imgur.com/shGnbj3.jpg" id="img" />
            {/* <video preload="auto" autoPlay="autoplay" loop="loop" id="img">
              <source src="https://i.imgur.com/G6qr5Ek.mp4" type="video/mp4" />
            </video> */}
            <img
              src="https://www.solidbackgrounds.com/images/2560x1600/2560x1600-floral-white-solid-color-background.jpg"
              id="whiteBG"
            />
            <div id="landingDiv">
              <h4 className="promotion" id="promotion">
                To plant a garden <br />is to believe in tomorrow.
              </h4>
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
              <span className={isEmailWarningDisplayed}>
                Must be a valid email address<br />
              </span>
              <input
                name="email"
                type="text"
                onChange={this.handleEmailChange}
                className={errorDisplay('email') ? 'fieldError' : ''}
                onBlur={this.handleBlurWhenInteracting('email')}
              />
            </div>
            <div>
              <label htmlFor="password">
                <small>Password</small>
              </label>
              <span className={isPasswordWarningDisplayed}>
                Password required<br />
              </span>
              <input
                name="password"
                type="password"
                onChange={this.handlePasswordChange}
                className={errorDisplay('password') ? 'fieldError' : ''}
                onBlur={this.handleBlurWhenInteracting('password')}
              />
            </div>
            <div>
              <button type="submit" disabled={!isButtonWorking}>
                {displayName}
              </button>{' '}
              <button type="button" className="googleOAuth">
                <a href="/auth/google">{displayName} with Google</a>
              </button>
            </div>
            {error && error.response && <div> {error.response.data} </div>}
          </form>
          <div className="landing-page">
            <img src="https://i.imgur.com/shGnbj3.jpg" id="img" />{' '}
            {/* <video preload="auto" autoPlay="autoplay" loop="loop" id="img">
              <source src="https://i.imgur.com/G6qr5Ek.mp4" type="video/mp4" />
            </video> */}
            <img
              src="https://www.solidbackgrounds.com/images/2560x1600/2560x1600-floral-white-solid-color-background.jpg"
              id="whiteBG"
            />
            <div id="landingDiv">
              <h4 className="promotion" id="promotion">
                To plant a garden <br />is to believe in tomorrow.
              </h4>
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
    }
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
