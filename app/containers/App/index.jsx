import React, { useContext } from 'react'
import { CssBaseline } from '@mui/material'

import { AuthContext } from 'contexts/Auth'
import Header from 'containers/Header'
import Navigation from 'routes'

import { StyledMain } from './styles'

const Component = () => {
  const { currentUser } = useContext(AuthContext)

  return (
    <>
      <CssBaseline />
      {currentUser && <Header />}
      <StyledMain component="main">
        <Navigation />
      </StyledMain>
    </>
  )
}

export default Component
