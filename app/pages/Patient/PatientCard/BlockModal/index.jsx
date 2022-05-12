import React from 'react'

import ConfirmModal from 'components/ConfirmModal'
import { PATIENT_BLOCK_CONFIRM_TEXT } from './constants'

const PatientBlockModal = ({ open, onClose, onConfirm }) => {
  return (
    <ConfirmModal
      open={open}
      onClose={onClose}
      onConfirm={onConfirm}
      localeText={{
        title: 'Tem a certeza?',
        text: PATIENT_BLOCK_CONFIRM_TEXT,
      }}
    />
  )
}

export default PatientBlockModal
