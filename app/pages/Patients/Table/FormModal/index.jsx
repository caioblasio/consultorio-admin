import React, { useEffect } from 'react'
import {
  Stack,
  TextField,
  Switch,
  FormGroup,
  FormControlLabel,
  Grid,
} from '@mui/material'
import InputMask from 'react-input-mask'
import { useForm, Controller } from 'react-hook-form'
import { validateCPF } from 'utils'
import Modal from 'components/Modal'

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

const FormModal = ({
  data = {
    name: '',
    phone: '',
    secondPhone: '',
    cpf: '',
    isActive: true,
  },
  onConfirm,
  onClose,
  open,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm({
    defaultValues: data,
  })

  const handleConfirm = (data) => {
    onConfirm(data)
    onClose()
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset()
    }
  }, [isSubmitSuccessful, reset])

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={data ? 'Editar Paciente' : 'Criar Paciente'}
      actions={[
        { label: 'Confirmar', onClick: handleSubmit(handleConfirm) },
        { label: 'Cancelar', onClick: onClose },
      ]}
    >
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
            name="secondPhone"
            control={control}
            render={({ field, fieldState: { invalid, error } }) => (
              <InputMask mask="(99) 99999-9999" {...field}>
                {(inputProps) => (
                  <TextField
                    label="Segundo Telefone"
                    {...inputProps}
                    error={invalid}
                    helperText={error?.message}
                  />
                )}
              </InputMask>
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
                      render={({ field: { value, ...rest } }) => (
                        <Switch checked={value} {...rest} />
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
    </Modal>
  )
}

export default FormModal
