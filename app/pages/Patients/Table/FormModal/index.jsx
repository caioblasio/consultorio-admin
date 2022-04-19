import React from 'react'
import { useForm } from 'react-hook-form'
import Modal from 'components/Modal'

import PatientForm from 'pages/Patient/PatientCard/Form'

const PatientModal = ({ data, holders, onConfirm, onClose, open = false }) => {
  const defaultValues = {
    name: '',
    holder: '',
    phone: [{ value: '' }],
    treatmentBegin: new Date(),
    isActive: true,
  }
  const { control, handleSubmit, reset, watch } = useForm({
    defaultValues,
  })

  const handleConfirm = ({ holder, phone, ...rest }) => {
    const submitData = {
      ...rest,
      phone: phone.map(({ value }) => value),
      holderId: holder?.id,
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
      <PatientForm
        data={data}
        holders={holders}
        defaultValues={defaultValues}
        control={control}
        reset={reset}
        watch={watch}
      />
    </Modal>
  )
}

export default PatientModal
