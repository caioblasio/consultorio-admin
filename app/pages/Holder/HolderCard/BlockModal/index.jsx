import React from 'react'

import ConfirmModal from 'components/ConfirmModal'
import { HOLDER_BLOCK_CONFIRM_TEXT } from './constants'

const HolderBlockModal = ({ open, onClose, onConfirm }) => {
  return (
    <ConfirmModal
      open={open}
      onClose={onClose}
      onConfirm={onConfirm}
      localeText={{
        title: 'Tem a certeza?',
        text: HOLDER_BLOCK_CONFIRM_TEXT,
      }}
    />
  )
}

export default HolderBlockModal
