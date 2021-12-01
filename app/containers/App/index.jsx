import React from 'react'
import { CssBaseline } from '@mui/material'
import Header from 'containers/Header'
import Navigation from 'routes'
import { AuthProvider } from 'contexts/Auth'

const Component = () => {
  return (
    <AuthProvider>
      <main className="main">
        <CssBaseline />
        <Navigation />
      </main>
    </AuthProvider>
  )
}

export default Component
