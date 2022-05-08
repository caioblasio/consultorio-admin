import React from 'react'
import { Typography, Stack, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { homeURL } from 'configs/urls'
import Page from 'containers/Page'
import barrier from 'assets/images/barrier.png'

import { StyledBox, StyledImageContainer, StyledImage } from './styles'

const ErrorPage = ({ resetErrorBoundary }) => {
  const navigate = useNavigate()
  return (
    <Page disableAutoSave>
      <StyledBox>
        <Stack spacing={4} alignItems="center">
          <StyledImageContainer>
            <StyledImage src={barrier} />
          </StyledImageContainer>
          <div>
            <Typography align="center" variant="h1" gutterBottom>
              Ups... Ocorreu um erro!
            </Typography>
            <Typography align="center" variant="body1">
              Ocorreu um erro inesperado em nossos sistemas. Por favor, tente
              novamente.
            </Typography>
          </div>
          <Stack spacing={1}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => resetErrorBoundary()}
            >
              Tentar novamente
            </Button>
            <Button
              onClick={() => {
                resetErrorBoundary()
                navigate(homeURL())
              }}
            >
              Voltar para a página principal
            </Button>
          </Stack>
        </Stack>
      </StyledBox>
    </Page>
  )
}

export default ErrorPage
