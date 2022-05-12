import React, { useEffect, useCallback, forwardRef } from 'react'
import { Stack } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import InputMask from 'react-input-mask'

import TextField from 'components/TextField'
import VALIDATION_SCHEMA from './validations'

const HolderForm = ({ data, onSubmit, mode = 'onSubmit', disabled }, ref) => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: data,
    mode,
  })

  useEffect(() => {
    const { patients, ...rest } = data
    const newData = { ...rest }

    reset(newData)
  }, [data])

  const handleSubmitData = useCallback(() => {
    handleSubmit((newData) => onSubmit({ ...newData, isActive: true }))()
  }, [mode])

  return (
    <form
      ref={ref}
      onSubmit={mode === 'onSubmit' ? handleSubmitData : undefined}
      onBlur={mode === 'onBlur' ? handleSubmitData : undefined}
    >
      <Stack spacing={2}>
        <Controller
          name="name"
          control={control}
          rules={{ ...VALIDATION_SCHEMA.name }}
          render={({ field, fieldState: { invalid, error } }) => (
            <TextField
              label="Nome Completo"
              {...field}
              disabled={disabled}
              error={invalid}
              helperText={error?.message}
              autoFocus
            />
          )}
        />
        <Controller
          name="cpf"
          control={control}
          rules={{ ...VALIDATION_SCHEMA.cpf }}
          render={({ field, fieldState: { invalid, error } }) => (
            <InputMask mask="999.999.999-99" {...field} disabled={disabled}>
              {(inputProps) => (
                <TextField
                  label="CPF"
                  {...inputProps}
                  error={invalid}
                  helperText={error?.message}
                  disabled={disabled}
                />
              )}
            </InputMask>
          )}
        />
      </Stack>
    </form>
  )
}

export default forwardRef(HolderForm)
