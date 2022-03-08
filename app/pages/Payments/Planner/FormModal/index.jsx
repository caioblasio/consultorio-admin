import React, { useEffect } from 'react'
import { Grid, Stack } from '@mui/material'
import { PersonRounded } from '@mui/icons-material'
import { useForm, Controller } from 'react-hook-form'

import TextField from 'components/TextField'
import CurrencyField from 'components/CurrencyField'
import Autocomplete from 'components/Autocomplete'
import Modal from 'components/Modal'
import MonthsField from 'components/MonthsField'
import SelectField from 'components/SelectField'

import VALIDATION_SCHEMA from './validations'
import { StyledYearItem } from './styles'

const PaymentsFormModal = ({
  data,
  position,
  onConfirm,
  onClose,
  pivotDate,
  open = false,
}) => {
  const defaultValues = {
    holder: '',
    rowId: '',
    referenceMonth: pivotDate.getMonth() + 1,
    referenceYear: pivotDate.getFullYear(),
    status: 'paid',
    type: '',
    value: 80,
  }
  const { control, handleSubmit, reset } = useForm({
    defaultValues,
  })

  useEffect(() => {
    let newData = { ...defaultValues }
    if (position) {
      newData = {
        ...newData,
        referenceMonth: position.columnId.getMonth() + 1,
        referenceYear: position.columnId.getFullYear(),
        rowId: position.rowId,
      }
    }

    if (data) {
      newData = {
        ...newData,
        ...data,
      }
    }

    reset(newData)
  }, [data, position])

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
            name="rowId"
            control={control}
            rules={{ ...VALIDATION_SCHEMA.patientId }}
            render={({ field }) => (
              <Autocomplete
                startAdornment={<PersonRounded />}
                label="Paciente"
                {...field}
              />
            )}
          />
          <Controller
            name="holder"
            control={control}
            rules={{ ...VALIDATION_SCHEMA.holder }}
            render={({ field }) => <TextField label="Titular" {...field} />}
          />
          <Grid container wrap="nowrap">
            <Grid item xs={6}>
              <Controller
                name="referenceMonth"
                control={control}
                rules={{ ...VALIDATION_SCHEMA.referenceMonth }}
                render={({ field }) => (
                  <MonthsField label="Periodo" {...field} />
                )}
              />
            </Grid>
            <StyledYearItem item xs>
              <Controller
                name="referenceYear"
                control={control}
                rules={{ ...VALIDATION_SCHEMA.referenceYear }}
                render={({ field }) => <TextField label="Ano" {...field} />}
              />
            </StyledYearItem>
          </Grid>

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
            name="value"
            control={control}
            rules={{ ...VALIDATION_SCHEMA.type }}
            render={({ field }) => (
              <CurrencyField disabled label="Pagamento" {...field} />
            )}
          />
        </Stack>
      </form>
    </Modal>
  )
}

export default PaymentsFormModal
