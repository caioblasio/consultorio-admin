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
import Modal from 'components/Modal'
import VALIDATION_SCHEMA from './validations'

const FormModal = ({ data, onConfirm, onClose, open = false }) => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      cpf: '',
      isActive: true,
    },
  })

  useEffect(() => {
    reset(data)
  }, [data])

  const handleConfirm = (newData) => {
    onConfirm(newData)
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
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
                    {...inputProps}
                    label="Celular"
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
