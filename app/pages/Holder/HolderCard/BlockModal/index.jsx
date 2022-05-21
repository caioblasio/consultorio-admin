import React from 'react'

import ConfirmModal from 'components/ConfirmModal'
import {
  HOLDER_BLOCK_CONFIRM_TEXT,
  HOLDER_BLOCK_CONFIRM_TITLE,
} from './constants'

const HolderBlockModal = ({ open, onClose, onConfirm }) => {
  return (
    <ConfirmModal
      open={open}
      onClose={onClose}
      onConfirm={onConfirm}
      localeText={{
        title: HOLDER_BLOCK_CONFIRM_TITLE,
        text: HOLDER_BLOCK_CONFIRM_TEXT,
      }}
    />
  )
}

export default HolderBlockModal
