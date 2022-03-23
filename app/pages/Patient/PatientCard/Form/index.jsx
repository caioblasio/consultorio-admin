import React, { useEffect } from 'react'
import { Stack, Grid, Button, IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { RemoveCircleOutlineOutlined } from '@mui/icons-material'
import InputMask from 'react-input-mask'
import { Controller, useFieldArray } from 'react-hook-form'

import TextField from 'components/TextField'
import Switch from 'components/Switch'
import VALIDATION_SCHEMA from './validations'

const PatientForm = ({
  data,
  onDataChange,
  defaultValues = {},
  control,
  reset,
  watch,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'phone',
  })

  const watchPhone = watch('phone')

  useEffect(() => {
    let newData = defaultValues
    if (data) {
      newData = {
        ...data,
        ...(data.phone
          ? { phone: data.phone.map((value) => ({ value })) }
          : {}),
      }
    }

    reset(newData)
  }, [data])

  return (
    <form>
      <Stack spacing={2}>
        <Controller
          name="name"
          control={control}
          rules={{ ...VALIDATION_SCHEMA.name }}
          render={({ field }) => (
            <TextField
              label="Nome Completo"
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
        <Stack spacing={2} alignItems="end">
          {fields.map((item, index) => (
            <Grid container columnGap={3} key={item.id}>
              <Grid item xs>
                <Controller
                  name={`phone.${index}.value`}
                  control={control}
                  rules={{ ...VALIDATION_SCHEMA.phone }}
                  render={({ field, fieldState: { invalid, error } }) => (
                    <InputMask
                      mask="(99) 99999-9999"
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
                          {...inputProps}
                          label="Celular"
                          error={invalid}
                          helperText={error?.message}
                        />
                      )}
                    </InputMask>
                  )}
                />
              </Grid>
              {index !== 0 && (
                <Grid item>
                  <IconButton
                    onClick={() => {
                      remove(index)
                      if (onDataChange) {
                        onDataChange()
                      }
                    }}
                  >
                    <RemoveCircleOutlineOutlined />
                  </IconButton>
                </Grid>
              )}
            </Grid>
          ))}
          {watchPhone.length < 3 && (
            <Button
              variant="text"
              size="small"
              startIcon={<AddIcon />}
              onClick={() => append({ value: '' })}
            >
              Adicionar novo contato
            </Button>
          )}
        </Stack>

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
  )
}

export default PatientForm
