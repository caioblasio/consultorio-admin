import React from 'react'
import { CssBaseline } from '@material-ui/core'
import Header from 'containers/Header'
import Navigation from 'routes'

const Component = () => {
  return (
    <main className="main">
      <CssBaseline />
      <Navigation />
    </main>
  )
}

export default Component
