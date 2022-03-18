import React from 'react'
import { useForm } from 'react-hook-form'
import Modal from 'components/Modal'

import PatientForm from 'pages/Patient/PatientCard/Form'

const PatientModal = ({ data, onConfirm, onClose, open = false }) => {
  const defaultValues = {
    name: '',
    phone: [{ value: '' }],
    cpf: '',
    isActive: true,
  }
  const { control, handleSubmit, reset, watch } = useForm({
    defaultValues,
  })

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
      <PatientForm
        data={data}
        defaultValues={defaultValues}
        control={control}
        reset={reset}
        watch={watch}
      />
    </Modal>
  )
}

export default PatientModal
