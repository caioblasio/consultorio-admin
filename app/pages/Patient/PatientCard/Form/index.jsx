import React, { useCallback, useEffect, forwardRef } from 'react'
import { Stack, Grid, Button, IconButton } from '@mui/material'
import DesktopDatePicker from '@mui/lab/DesktopDatePicker'
import {
  RemoveCircleOutlineOutlined,
  PersonRounded,
  Add,
} from '@mui/icons-material'
import InputMask from 'react-input-mask'
import { Controller, useFieldArray, useForm } from 'react-hook-form'

import Autocomplete from 'components/Autocomplete'
import TextField from 'components/TextField'
import SubOptionHolder from './SubOptionHolder'
import VALIDATION_SCHEMA from './validations'

const PatientForm = (
  { holders, data, mode = 'onSubmit', onSubmit, disabled },
  ref
) => {
  const { control, handleSubmit, reset, watch } = useForm({
    defaultValues: data,
    mode,
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'phone',
  })

  const watchPhone = watch('phone')

  useEffect(() => {
    const newData = {
      ...data,
      holder: holders.find(({ id }) => id === data.holderId) || '',
    }

    reset(newData)
  }, [data])

  const handleSubmitData = useCallback(() => {
    handleSubmit(({ holder, ...rest }) =>
      onSubmit({ ...rest, holderId: holder?.id, isActive: true })
    )()
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
          name="holder"
          control={control}
          rules={{ ...VALIDATION_SCHEMA.holder }}
          render={({ field, fieldState: { invalid, error } }) => (
            <Autocomplete
              label="Responsável"
              {...field}
              startAdornment={<PersonRounded />}
              options={holders}
              components={{
                SubOptionRenderer: SubOptionHolder,
              }}
              error={invalid}
              helperText={error?.message}
              disabled={disabled}
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
              disabled={disabled}
              renderInput={(params) => <TextField {...params} />}
            />
          )}
        />
        <Stack spacing={2} alignItems="end">
          {fields.map((item, index) => (
            <Grid container columnGap={3} key={`field-${item.id}`}>
              <Grid item xs>
                <Controller
                  name={`phone.${index}`}
                  control={control}
                  rules={{ ...VALIDATION_SCHEMA.phone }}
                  render={({ field, fieldState: { invalid, error } }) => (
                    <InputMask
                      mask="(99) 99999-9999"
                      {...field}
                      disabled={disabled}
                    >
                      {(inputProps) => (
                        <TextField
                          {...inputProps}
                          disabled={disabled}
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
                    disabled={disabled}
                    onClick={() => {
                      remove(index)
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
              disabled={disabled}
              onClick={() => append('')}
            >
              Adicionar novo contato
            </Button>
          )}
        </Stack>
      </Stack>
    </form>
  )
}

export default forwardRef(PatientForm)
