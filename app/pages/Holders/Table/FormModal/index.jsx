import React from 'react'
import { useForm } from 'react-hook-form'
import Modal from 'components/Modal'
import HolderForm from 'components/HolderForm'

const HolderModal = ({ data, onConfirm, onClose, open = false }) => {
  const defaultValues = {
    name: '',
    cpf: '',
    isActive: true,
  }
  const { control, handleSubmit, reset, watch } = useForm({
    defaultValues,
  })

  const handleConfirm = (submitData) => {
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
      title={data ? 'Editar Responsável' : 'Criar Responsável'}
      actions={[
        { label: 'Confirmar', onClick: handleSubmit(handleConfirm) },
        { label: 'Cancelar', onClick: handleClose },
      ]}
    >
      <HolderForm
        data={data}
        defaultValues={defaultValues}
        control={control}
        reset={reset}
        watch={watch}
      />
    </Modal>
  )
}

export default HolderModal
