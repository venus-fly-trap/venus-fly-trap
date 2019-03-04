import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props

  return (
    <div>
      <h3>Welcome, {email}</h3>
      <br />
      <center>
        <div className="landing-page">
          {/* <img src="https://i.imgur.com/jWPMHL6.gif" id="img" /> */}
          <video preload="auto" autoPlay="autoplay" loop="loop" id="img">
            <source src="https://i.imgur.com/G6qr5Ek.mp4" type="video/mp4" />
          </video>
          <div id="landingDiv">
            <h4 className="promotion" id="promotion">
              This week only, BOGO!
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
      </center>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
