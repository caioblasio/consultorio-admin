import React from 'react'
import Authentication from 'pages/authentication'
import { useHistory } from 'react-router-dom'
import { Box, Card, CardMedia, CardContent, Typography } from '@mui/material'
import LogoWithTextSVG from 'assets/svg/logo-with-text.svg'
import { StyledGoogleButton } from './styles'
import { signIn } from 'api/authentication'

const Login = () => {
  const history = useHistory()
  return (
    <Authentication>
      <Card sx={{ padding: 6 }}>
        <CardMedia
          component="img"
          image={LogoWithTextSVG}
          alt="Dental Plus Logo"
          sx={{ width: 120, display: 'inline' }}
        />
        <CardContent>
          <Box mb={4}>
            <Typography
              color="text.secondary"
              variant="subtitle1"
              component="h1"
              gutterBottom
            >
              Bem-vindo ao consultório Dental Plus
            </Typography>
            <Typography variant="body2">
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
      </Card>
    </Authentication>
  )
}

export default Login
