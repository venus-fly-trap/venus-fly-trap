import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <nav>
      <Link to="/">
        <h1>Venus Fly Trap</h1>
      </Link>
      {isLoggedIn ? (
        <div className="right">
          {/* The navbar will show these links after you log in */}
          {/* <Link to="/home">Home</Link> */}
          <Link to="/products">
            {/* Store */}
            <i className="material-icons">store</i>
          </Link>
          <div className="dropdown">
            <a href="#" className="dropLink">
              <i className="material-icons">account_circle</i>
              {/* User */}
            </a>
            <div className="dropdown-content">
              <Link to="/orders">Orders</Link>
              <a href="#" onClick={handleClick}>
                Logout
              </a>
            </div>
          </div>
          <Link to="/cart">
            <i className="material-icons">shopping_cart</i>
          </Link>
        </div>
      ) : (
        <div className="right">
          {/* The navbar will show these links before you log in */}
          {/* <Link to="/products">Store</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link> */}
          <Link to="/products">
            <i className="material-icons">store</i>
          </Link>
          <div className="dropdown">
            <a href="#" className="dropLink">
              <i className="material-icons">account_circle</i>
            </a>
            <div className="dropdown-content">
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
