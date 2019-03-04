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
