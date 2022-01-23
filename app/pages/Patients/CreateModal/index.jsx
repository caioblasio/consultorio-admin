import React, { useEffect } from 'react'
import {
  Modal,
  Stack,
  TextField,
  IconButton,
  Button,
  Switch,
  FormGroup,
  FormControlLabel,
  Grid,
} from '@mui/material'
import InputMask from 'react-input-mask'
import CloseIcon from '@mui/icons-material/Close'
import { useForm, Controller } from 'react-hook-form'
import { validateCPF } from 'utils'
import {
  StyledModalContainer,
  StyledFormContainer,
  StyledTitle,
  StyledCloseContainer,
} from './styles'

const VALIDATION_SCHEMA = {
  name: {
    required: 'Este campo é obrigatório',
  },
  phone: {
    required: 'Este campo é obrigatório',
  },
  email: {
    pattern: {
      value:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: 'Email inválido',
    },
  },
  cpf: {
    required: 'Este campo é obrigatório',
    validate: (v) => validateCPF(v) || 'CPF inválido',
  },
}

const CreateModal = ({ open, handleClose, onSubmit }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      cpf: '',
      isActive: true,
    },
  })

  const onClose = () => {
    reset()
    handleClose()
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset()
    }
  }, [isSubmitSuccessful, reset])

  return (
    <Modal open={open} onClose={onClose}>
      <StyledModalContainer elevation={3}>
        <StyledCloseContainer>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </StyledCloseContainer>
        <Stack spacing={2}>
          <StyledTitle variant="h6" component="h2">
            Criar Paciente
          </StyledTitle>
          <StyledFormContainer>
            <form>
              <Stack spacing={4}>
                <Controller
                  name="name"
                  control={control}
                  rules={{ ...VALIDATION_SCHEMA.name }}
                  render={({ field }) => (
                    <TextField label="Nome Completo" {...field} />
                  )}
                />
                <Controller
                  name="phone"
                  control={control}
                  rules={{ ...VALIDATION_SCHEMA.phone }}
                  render={({ field, fieldState: { invalid, error } }) => (
                    <InputMask mask="(99) 99999-9999" {...field}>
                      {(inputProps) => (
                        <TextField
                          label="Celular"
                          {...inputProps}
                          error={invalid}
                          helperText={error?.message}
                        />
                      )}
                    </InputMask>
                  )}
                />
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

                <Grid container columnGap={3}>
                  <Grid item xs>
                    <Controller
                      name="cpf"
                      control={control}
                      rules={{ ...VALIDATION_SCHEMA.cpf }}
                      render={({ field, fieldState: { invalid, error } }) => (
                        <InputMask mask="999.999.999-99" {...field}>
                          {(inputProps) => (
                            <TextField
                              label="CPF"
                              {...inputProps}
                              error={invalid}
                              helperText={error?.message}
                            />
                          )}
                        </InputMask>
                      )}
                    />
                  </Grid>
                  <Grid item>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Controller
                            name="isActive"
                            control={control}
                            render={({ field }) => (
                              <Switch defaultChecked {...field} />
                            )}
                          />
                        }
                        label="Ativo"
                      />
                    </FormGroup>
                  </Grid>
                </Grid>
              </Stack>
            </form>
          </StyledFormContainer>
          <Grid container justifyContent="flex-end" columnGap={1}>
            <Grid item>
              <Button variant="text" color="inherit" onClick={onClose}>
                Cancelar
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit(onSubmit)}
              >
                Criar Paciente
              </Button>
            </Grid>
          </Grid>
        </Stack>
      </StyledModalContainer>
    </Modal>
  )
}

export default CreateModal
