import React, { useContext, useEffect, useState } from 'react'
import { CssBaseline } from '@mui/material'

import { AuthContext } from 'contexts/Auth'
import Header from 'containers/Header'
import ConfirmModal from 'components/ConfirmModal'
import Navigation from 'routes'

import { StyledMain } from './styles'

const Component = () => {
  const { currentUser } = useContext(AuthContext)
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <CssBaseline />
      {currentUser && <Header />}
      <StyledMain component="main">
        <Navigation />
      </StyledMain>
      <ConfirmModal
        open={showModal}
        onClose={() => setShowModal(false)}
        localeText={{
          title: 'Tem a certeza que quer continuar?',
          text: 'As suas alterações podem acabar por não serem salvas.',
        }}
      />
    </>
  )
}

export default Component
