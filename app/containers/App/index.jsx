import React from 'react'
import { CssBaseline } from '@mui/material'
import Navigation from 'routes'
import { AuthProvider } from 'contexts/Auth'

import { StyledMain } from './styles'

const Component = () => {
  return (
    <AuthProvider>
      <StyledMain>
        <CssBaseline />
        <Navigation />
      </StyledMain>
    </AuthProvider>
  )
}

export default Component
