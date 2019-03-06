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
    <div className="landing-page">
      <br />
      <center>
        <div>
          {/* <img src="https://i.imgur.com/PJzxcIe.jpg" id="img" /> */}
          <img src="https://3c1703fe8d.site.internapcdn.net/newman/gfx/news/hires/2018/plantindoor.jpg" />
          {/* <img src="https://www.trbimg.com/img-5852d971/turbine/ct-parent-like-a-potted-plant-balancing-1215-20161215" /> */}
          {/* <img src="https://i.imgur.com/qJyfxh8.jpg?1" id="img" /> */}
          {/* <video preload="auto" autoPlay="autoplay" loop="loop" id="img">
            <source src="https://i.imgur.com/G6qr5Ek.mp4" type="video/mp4" />
          </video> */}
          {/* <img
            src="https://www.solidbackgrounds.com/images/2560x1600/2560x1600-floral-white-solid-color-background.jpg"
            id="whiteBG"
          /> */}
          <div id="landingDiv">
            <h4 className="promotion" id="promotion">
              To plant a garden <br />is to believe in tomorrow.
            </h4>
            <button type="button" className="btn">
              <Link to="/products" className="link">
                SHOP
              </Link>
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
