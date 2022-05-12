import React, { useRef } from 'react'
import Modal from 'components/Modal'

import PatientForm from 'pages/Patient/PatientCard/Form'

const PatientModal = ({ data, holders, onConfirm, onClose, open = false }) => {
  const isEdit = !!data
  const formRef = useRef()
  const formData = {
    name: '',
    holder: '',
    phone: [''],
    treatmentBegin: new Date(),
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
      title={isEdit ? 'Editar Paciente' : 'Criar Paciente'}
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
      <PatientForm
        data={formData}
        holders={holders}
        onSubmit={handleConfirm}
        ref={formRef}
      />
    </Modal>
  )
}

export default PatientModal
