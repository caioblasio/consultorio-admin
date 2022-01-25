import React from 'react'
import AuthPage from 'components/AuthPage'
import { useNavigate } from 'react-router-dom'
import { Box, CardContent, Typography } from '@mui/material'
import Media from './Media'
import { StyledGoogleButton, StyledCard, StyledLogoTitle } from './styles'
import { signIn } from 'api/authentication'
import { homeURL } from 'configs/urls'

const LoginPage = () => {
  const navigate = useNavigate()
  return (
    <AuthPage>
      <Media />
      <StyledCard elevation={3}>
        <CardContent>
          <Box mb={6}>
            <StyledLogoTitle />
          </Box>
          <Box mb={6}>
            <Typography variant="title1" component="h1" gutterBottom>
              Bem-vindo ao consultório Dental Plus
            </Typography>
          </Box>
          <Box mb={4}>
            <Typography variant="body1">
              Clique no botão abaixo para aceder à aplicação
            </Typography>
          </Box>
          <Box>
            <StyledGoogleButton
              label="Entrar com Google"
              onClick={async () => {
                // dispatch(UserActions.signInWithGoogle())
                await signIn()
                navigate(homeURL())
                console.log('Google button clicked')
              }}
            />
          </Box>
        </CardContent>
      </StyledCard>
    </AuthPage>
  )
}

export default LoginPage
