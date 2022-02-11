import React, { useEffect } from 'react'
import { Stack, TextField, Grid, Button, IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import InputMask from 'react-input-mask'
import { useForm, Controller, useFieldArray } from 'react-hook-form'

import Switch from 'components/Switch'
import Modal from 'components/Modal'
import VALIDATION_SCHEMA from './validations'

const FormModal = ({ data, onConfirm, onClose, open = false }) => {
  const defaultValues = {
    name: '',
    phone: [{ value: '' }],
    cpf: '',
    isActive: true,
  }
  const { control, handleSubmit, reset, watch } = useForm({
    defaultValues,
  })

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

  const handleConfirm = (newData) => {
    const submitData = {
      ...newData,
      ...(newData.phone
        ? { phone: newData.phone.map(({ value }) => value) }
        : {}),
    }
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
      title={data ? 'Editar Paciente' : 'Criar Paciente'}
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
            render={({ field }) => (
              <TextField label="Nome Completo" {...field} />
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
                </Grid>
                {index !== 0 && (
                  <Grid item>
                    <IconButton onClick={() => remove(index)}>
                      <RemoveCircleOutlineIcon />
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
              <Controller
                name="isActive"
                control={control}
                render={({ field }) => <Switch label="Ativo" {...field} />}
              />
            </Grid>
          </Grid>
        </Stack>
      </form>
    </Modal>
  )
}

export default FormModal
