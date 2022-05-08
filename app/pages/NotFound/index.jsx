import React from 'react'
import { Typography, Stack, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { homeURL } from 'configs/urls'
import Page from 'containers/Page'
import binoculars from 'assets/images/binoculars.png'

import { StyledBox, StyledImageContainer, StyledImage } from './styles'

const NotFoundPage = () => {
  const navigate = useNavigate()
  return (
    <Page disableAutoSave>
      <StyledBox>
        <Stack spacing={4} alignItems="center">
          <StyledImageContainer>
            <StyledImage src={binoculars} />
          </StyledImageContainer>
          <div>
            <Typography align="center" variant="h1" gutterBottom>
              Página não encontrada!
            </Typography>
            <Typography align="center" variant="body1">
              Pedimos desculpa mas a página que está tentando acessar não
              existe.
            </Typography>
          </div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(homeURL())}
          >
            Voltar para página principal
          </Button>
        </Stack>
      </StyledBox>
    </Page>
  )
}

export default NotFoundPage
