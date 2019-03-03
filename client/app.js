import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import {Link} from 'react-router-dom'

const App = () => {
  return (
    <div>
      <main>
        <Navbar />
        <Routes />
      </main>
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

export default App
