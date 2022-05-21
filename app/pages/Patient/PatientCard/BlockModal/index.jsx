import React from 'react'

import ConfirmModal from 'components/ConfirmModal'
import {
  PATIENT_BLOCK_CONFIRM_TEXT,
  PATIENT_BLOCK_CONFIRM_TITLE,
} from './constants'

const PatientBlockModal = ({ open, onClose, onConfirm }) => {
  return (
    <ConfirmModal
      open={open}
      onClose={onClose}
      onConfirm={onConfirm}
      localeText={{
        title: PATIENT_BLOCK_CONFIRM_TITLE,
        text: PATIENT_BLOCK_CONFIRM_TEXT,
      }}
    />
  )
}

export default PatientBlockModal
