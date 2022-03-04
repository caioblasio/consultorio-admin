import React, { useEffect } from 'react'
import { Stack, TextField } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'

import Modal from 'components/Modal'
import MonthsField from 'components/MonthsField'
import SelectField from 'components/SelectField'

import VALIDATION_SCHEMA from './validations'

const PaymentsFormModal = ({
  data,
  onConfirm,
  onClose,
  pivotDate,
  open = false,
}) => {
  const defaultValues = {
    holder: '',
    patientId: '',
    reference: pivotDate.getMonth() + 1,
    status: 'paid',
    type: '',
    value: 0,
  }
  const { control, handleSubmit, reset } = useForm({
    defaultValues,
  })

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
      title={data ? 'Editar Pagamento' : 'Criar Pagamento'}
      actions={[
        { label: 'Confirmar', onClick: handleSubmit(handleConfirm) },
        { label: 'Cancelar', onClick: handleClose },
      ]}
    >
      <form>
        <Stack spacing={2}>
          <Controller
            name="patientId"
            control={control}
            rules={{ ...VALIDATION_SCHEMA.patientId }}
            render={({ field }) => <TextField label="Paciente" {...field} />}
          />
          <Controller
            name="holder"
            control={control}
            rules={{ ...VALIDATION_SCHEMA.holder }}
            render={({ field }) => <TextField label="Titular" {...field} />}
          />
          <Controller
            name="reference"
            control={control}
            rules={{ ...VALIDATION_SCHEMA.references }}
            render={({ field }) => <MonthsField label="Periodo" {...field} />}
          />

          <Controller
            name="status"
            control={control}
            rules={{ ...VALIDATION_SCHEMA.status }}
            render={({ field }) => (
              <SelectField
                label="Estado"
                options={[
                  { label: 'Pago', value: 'paid' },
                  { label: 'Devendo', value: 'owing' },
                  { label: 'Perdoado', value: 'forgiven' },
                ]}
                {...field}
              />
            )}
          />

          <Controller
            name="type"
            control={control}
            rules={{ ...VALIDATION_SCHEMA.type }}
            render={({ field }) => <TextField label="Pagamento" {...field} />}
          />
        </Stack>
      </form>
    </Modal>
  )
}

export default PaymentsFormModal
