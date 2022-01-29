import React, { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import AuthPage from 'components/AuthPage'
import { useNavigate } from 'react-router-dom'
import {
  Stack,
  Box,
  Button,
  CardContent,
  Typography,
  TextField,
} from '@mui/material'
import Media from './Media'
import { StyledCard, StyledLogoTitle } from './styles'
import { signIn } from 'api/authentication'
import { homeURL } from 'configs/urls'
import { LOGIN_ERRORS } from './constants'

const VALIDATION_SCHEMA = {
  email: {
    pattern: {
      value:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: 'Email inválido',
    },
    required: 'Este campo é obrigatório',
  },
  password: {
    required: 'Este campo é obrigatório',
  },
}

const LoginPage = () => {
  const navigate = useNavigate()
  const [loginErrorCode, setLoginErrorCode] = useState('')
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data) => {
    try {
      await signIn(data)
      navigate(homeURL())
    } catch (error) {
      console.log(error)
      setLoginErrorCode(error.code)
    }
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset()
    }
  }, [isSubmitSuccessful, reset])

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
          <Box>
            <form>
              <Stack spacing={3}>
                <Controller
                  name="email"
                  control={control}
                  rules={{ ...VALIDATION_SCHEMA.email }}
                  render={({ field, fieldState: { invalid, error } }) => (
                    <TextField
                      label="Email"
                      type="email"
                      error={invalid}
                      helperText={error?.message}
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="password"
                  control={control}
                  rules={{ ...VALIDATION_SCHEMA.password }}
                  render={({ field, fieldState: { invalid, error } }) => (
                    <TextField
                      label="Senha"
                      type="password"
                      error={invalid}
                      helperText={error?.message}
                      {...field}
                    />
                  )}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit(onSubmit)}
                >
                  Entrar
                </Button>
                {loginErrorCode && (
                  <Typography variant="caption">
                    {LOGIN_ERRORS[loginErrorCode] || LOGIN_ERRORS.default}
                  </Typography>
                )}
              </Stack>
            </form>
          </Box>
        </CardContent>
      </StyledCard>
    </AuthPage>
  )
}

export default LoginPage
