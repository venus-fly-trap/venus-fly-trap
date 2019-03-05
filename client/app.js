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
    </div>
  )
}

export default App
