import React, { useEffect } from 'react'
import { Stack, Grid, Button, IconButton } from '@mui/material'
import DesktopDatePicker from '@mui/lab/DesktopDatePicker'
import {
  RemoveCircleOutlineOutlined,
  PersonRounded,
  Add,
} from '@mui/icons-material'
import InputMask from 'react-input-mask'
import { Controller, useFieldArray } from 'react-hook-form'

import Autocomplete from 'components/Autocomplete'
import TextField from 'components/TextField'
import Switch from 'components/Switch'
import SubOptionHolder from './SubOptionHolder'
import VALIDATION_SCHEMA from './validations'

const PatientForm = ({
  holders,
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
      const { phone, ...rest } = data
      newData = {
        ...rest,
        phone: phone.map((value) => ({ value })),
        holder: holders.find(({ id }) => id === data.holderId) || '',
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
        <Controller
          name="holder"
          control={control}
          rules={{ ...VALIDATION_SCHEMA.holder }}
          render={({ field, fieldState: { invalid, error } }) => (
            <Autocomplete
              label="Responsável"
              startAdornment={<PersonRounded />}
              options={holders}
              components={{
                SubOptionRenderer: SubOptionHolder,
              }}
              onInputBlur={() => {
                field.onBlur()
                if (onDataChange) {
                  onDataChange()
                }
              }}
              error={invalid}
              helperText={error?.message}
              {...field}
            />
          )}
        />
        <Controller
          name="treatmentBegin"
          control={control}
          rules={{ ...VALIDATION_SCHEMA.treatmentBegin }}
          render={({ field }) => (
            <DesktopDatePicker
              label="Início do Tratamento"
              {...field}
              renderInput={(params) => (
                <TextField
                  {...params}
                  onBlur={() => {
                    params.inputProps?.onBlur()
                    if (onDataChange) {
                      onDataChange()
                    }
                  }}
                />
              )}
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
                          label="N° Celular"
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
          {watchPhone.length < 2 && (
            <Button
              variant="text"
              size="small"
              startIcon={<Add />}
              onClick={() => append({ value: '' })}
            >
              Adicionar novo contato
            </Button>
          )}
        </Stack>
      </Stack>
    </form>
  )
}

export default PatientForm
