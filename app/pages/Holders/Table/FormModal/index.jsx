import React, { useRef } from 'react'
import Modal from 'components/Modal'
import HolderForm from 'pages/Holder/HolderCard/Form'

const HolderModal = ({ data, onConfirm, onClose, open = false }) => {
  const isEdit = !!data
  const formRef = useRef()
  const formData = {
    name: '',
    cpf: '',
    ...(data || {}),
  }

  const handleConfirm = (newData) => {
    onClose()
    onConfirm(newData)
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? 'Editar Responsável' : 'Criar Responsável'}
      actions={[
        {
          label: 'Confirmar',
          onClick: () => {
            formRef.current.dispatchEvent(
              new Event('submit', { bubbles: true, cancelable: true })
            )
          },
        },
        { label: 'Cancelar', onClick: onClose },
      ]}
    >
      <HolderForm ref={formRef} data={formData} onSubmit={handleConfirm} />
    </Modal>
  )
}

export default HolderModal
