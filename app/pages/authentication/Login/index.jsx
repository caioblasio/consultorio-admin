import React from 'react'
import Authentication from 'pages/authentication'
import { useHistory } from 'react-router-dom'
import { Box, CardContent, Typography } from '@mui/material'
import Media from './Media'
import {
  StyledGoogleButton,
  StyledCard,
  StyledContainer,
  StyledLogoTitle,
} from './styles'
import { signIn } from 'api/authentication'

const Login = () => {
  const history = useHistory()
  return (
    <Authentication>
      <StyledContainer>
        <Media />
        <StyledCard>
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
                  history.push('/')
                  console.log('Google button clicked')
                }}
              />
            </Box>
          </CardContent>
        </StyledCard>
      </StyledContainer>
    </Authentication>
  )
}

export default Login
