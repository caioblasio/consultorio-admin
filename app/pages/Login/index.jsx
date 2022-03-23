import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Stack, Box, CardContent, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { EmailOutlined, LockOutlined } from '@mui/icons-material'

import TextField from 'components/TextField'
import PasswordField from 'components/PasswordField'
import AuthPage from 'containers/AuthPage'
import Alert from 'components/Alert'
import { signIn } from 'api/authentication'
import { homeURL } from 'configs/urls'
import Media from './Media'
import { StyledCard, StyledLogoTitle } from './styles'
import { LOGIN_ERRORS } from './constants'
import VALIDATION_SCHEMA from './validations'

const LoginPage = () => {
  const navigate = useNavigate()
  const [loginErrorCode, setLoginErrorCode] = useState('')
  const [loading, setLoading] = useState(false)
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data) => {
    try {
      setLoading(true)
      await signIn(data)
      navigate(homeURL())
    } catch (error) {
      setLoginErrorCode(error.code)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthPage>
      <Media />
      <StyledCard elevation={3}>
        <CardContent>
          <Box mb={6}>
            <StyledLogoTitle />
          </Box>
          <Box mb={4}>
            <Typography variant="title1" component="h1" gutterBottom>
              Bem-vindo ao consultório Dental Plus
            </Typography>
          </Box>
          {loginErrorCode && (
            <Box mb={3}>
              <Alert severity="error">
                {LOGIN_ERRORS[loginErrorCode] || LOGIN_ERRORS.default}
              </Alert>
            </Box>
          )}
          <Box>
            <form>
              <Stack spacing={3}>
                <Controller
                  name="email"
                  control={control}
                  rules={{ ...VALIDATION_SCHEMA.email }}
                  render={({ field, fieldState: { invalid, error } }) => (
                    <TextField
                      label="E-mail"
                      type="email"
                      error={invalid}
                      helperText={error?.message}
                      startAdornment={<EmailOutlined />}
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="password"
                  control={control}
                  rules={{ ...VALIDATION_SCHEMA.password }}
                  render={({ field, fieldState: { invalid, error } }) => (
                    <PasswordField
                      label="Senha"
                      error={invalid}
                      helperText={error?.message}
                      startAdornment={<LockOutlined />}
                      {...field}
                    />
                  )}
                />
                <LoadingButton
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit(onSubmit)}
                  loading={loading}
                >
                  Entrar
                </LoadingButton>
              </Stack>
            </form>
          </Box>
        </CardContent>
      </StyledCard>
    </AuthPage>
  )
}

export default LoginPage
