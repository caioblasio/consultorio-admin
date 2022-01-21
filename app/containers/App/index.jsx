import React, { useContext } from 'react'
import { CssBaseline } from '@mui/material'

import { AuthContext } from 'contexts/Auth'
import Drawer from 'containers/Drawer'
import Header from 'containers/Header'
import Navigation from 'routes'

import { StyledMain } from './styles'

const Component = () => {
  const { currentUser } = useContext(AuthContext)

  return (
    <>
      <CssBaseline />
      {currentUser && <Drawer />}
      {currentUser && <Header />}
      <StyledMain>
        <Navigation />
      </StyledMain>
    </>
  )
}

export default Component
