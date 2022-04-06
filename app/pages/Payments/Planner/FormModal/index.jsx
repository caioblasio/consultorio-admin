import React, { useEffect } from 'react'
import { Grid, Stack } from '@mui/material'
import { PersonRounded } from '@mui/icons-material'
import DesktopDatePicker from '@mui/lab/DesktopDatePicker'
import DatePicker from '@mui/lab/DatePicker'
import { useForm, Controller } from 'react-hook-form'

import TextField from 'components/TextField'
import CurrencyField from 'components/CurrencyField'
import Modal from 'components/Modal'
import SelectField from 'components/SelectField'
import Autocomplete from 'components/Autocomplete'

import { standardToCentesimal, centesimalToStandard } from 'utils/currency'

import VALIDATION_SCHEMA from './validations'
import { useMemo } from 'react'

const PaymentsFormModal = ({
  data,
  patients,
  onConfirm,
  onClose,
  currentDate,
  open = false,
}) => {
  const defaultValues = useMemo(() => {
    return {
      holder: '',
      patient: '',
      reference: new Date(currentDate.getFullYear(), currentDate.getMonth()),
      madeAt: new Date(),
      status: 'paid',
      type: 'card',
      value: 90,
    }
  }, [currentDate])

  const { control, handleSubmit, watch, setValue, reset } = useForm({
    defaultValues,
  })

  const patient = watch('patient')

  if (patient) {
    setValue('holder', patient.label)
  }

  useEffect(() => {
    let newData = { ...defaultValues }
    if (data) {
      if (data.id) {
        newData.id = data.id
      }

      if (data.status) {
        newData.status = data.status
      }

      if (data.rowId && data.columnId) {
        const patient = patients.find(({ id }) => id === data.rowId)
        const reference = new Date(newData.reference)
        reference.setMonth(data.columnId.getMonth())
        reference.setFullYear(data.columnId.getFullYear())
        newData = {
          ...newData,
          patient,
          reference,
        }
      }

      if (data.data) {
        const { value, ...rest } = data.data
        newData = {
          ...newData,
          ...rest,
          value: centesimalToStandard(value),
        }
      }
    }

    reset(newData)
  }, [data])

  const handleConfirm = ({ patient, value, ...rest }) => {
    const submitData = {
      ...rest,
      value: standardToCentesimal(value),
      patientId: patient.id,
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
      title={data && data.data ? 'Editar Pagamento' : 'Criar Pagamento'}
      actions={[
        { label: 'Confirmar', onClick: handleSubmit(handleConfirm) },
        { label: 'Cancelar', onClick: handleClose },
      ]}
    >
      <form>
        <Stack spacing={2}>
          <Controller
            name="patient"
            control={control}
            rules={{ ...VALIDATION_SCHEMA.patientId }}
            render={({ field }) => (
              <Autocomplete
                label="Paciente"
                startAdornment={<PersonRounded />}
                options={patients}
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
          <Controller
            name="reference"
            control={control}
            rules={{ ...VALIDATION_SCHEMA.reference }}
            render={({ field }) => (
              <DatePicker
                views={['year', 'month']}
                label="Periodo de Referência"
                {...field}
                renderInput={(params) => <TextField {...params} />}
              />
            )}
          />
          <Controller
            name="madeAt"
            control={control}
            rules={{ ...VALIDATION_SCHEMA.madeAt }}
            render={({ field }) => (
              <DesktopDatePicker
                label="Data de Realização"
                {...field}
                renderInput={(params) => <TextField {...params} />}
              />
            )}
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

          <Grid container columnGap={2}>
            <Grid item xs>
              <Controller
                name="type"
                control={control}
                rules={{ ...VALIDATION_SCHEMA.type }}
                render={({ field }) => (
                  <SelectField
                    label="Modo"
                    options={[
                      { label: 'Cartão', value: 'card' },
                      { label: 'Dinheiro', value: 'cash' },
                      { label: 'PIX', value: 'transfer' },
                    ]}
                    {...field}
                  />
                )}
              />
            </Grid>

            <Grid item xs>
              <Controller
                name="value"
                control={control}
                rules={{ ...VALIDATION_SCHEMA.type }}
                render={({ field }) => (
                  <CurrencyField disabled label="Valor" {...field} />
                )}
              />
            </Grid>
          </Grid>
        </Stack>
      </form>
    </Modal>
  )
}

export default PaymentsFormModal
