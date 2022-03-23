import React from 'react'

import { Typography } from '@mui/material'
import Modal from 'components/Modal'

const ConfirmModal = ({
  open,
  onClose,
  onConfirm,
  isLoading = false,
  localeText: {
    title = 'Tem a certeza?',
    text = 'Tem a certeza que quer continuar?',
  },
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      actions={[
        {
          label: 'Confirmar',
          onClick: () => {
            onConfirm()
            onClose()
          },
          isLoading,
        },
        { label: 'Cancelar', onClick: onClose },
      ]}
      title={title}
    >
      <Typography>{text}</Typography>
    </Modal>
  )
}

export default ConfirmModal
