import React, { useEffect } from 'react'
import { Stack, Grid } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import InputMask from 'react-input-mask'

import Modal from 'components/Modal'
import TextField from 'components/TextField'
import Switch from 'components/Switch'
import VALIDATION_SCHEMA from './validations'

const HolderModal = ({
  data,
  onConfirm,
  onClose,
  onDataChange,
  open = false,
}) => {
  const defaultValues = {
    name: '',
    cpf: '',
    isActive: true,
  }
  const { control, handleSubmit, reset, watch } = useForm({
    defaultValues,
  })

  useEffect(() => {
    let newData = defaultValues
    if (data) {
      const { patients, ...rest } = data
      newData = { ...rest }
    }

    reset(newData)
  }, [data])

  const handleConfirm = (submitData) => {
    handleClose()
    onConfirm(submitData)
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={data ? 'Editar Responsável' : 'Criar Responsável'}
      actions={[
        { label: 'Confirmar', onClick: handleSubmit(handleConfirm) },
        { label: 'Cancelar', onClick: handleClose },
      ]}
    >
      <form>
        <Stack spacing={2}>
          <Controller
            name="name"
            control={control}
            rules={{ ...VALIDATION_SCHEMA.name }}
            render={({ field, fieldState: { invalid, error } }) => (
              <TextField
                label="Nome Completo"
                {...field}
                onBlur={() => {
                  field.onBlur()
                  if (onDataChange) {
                    onDataChange()
                  }
                }}
                error={invalid}
                helperText={error?.message}
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
                  <InputMask
                    mask="999.999.999-99"
                    {...field}
                    onBlur={() => {
                      field.onBlur()
                      if (onDataChange) {
                        onDataChange()
                      }
                    }}
                  >
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
              <Controller
                name="isActive"
                control={control}
                render={({ field }) => (
                  <Switch
                    label="Ativo"
                    {...field}
                    onBlur={() => {
                      field.onBlur()
                      if (onDataChange) {
                        onDataChange()
                      }
                    }}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Stack>
      </form>
    </Modal>
  )
}

export default HolderModal
