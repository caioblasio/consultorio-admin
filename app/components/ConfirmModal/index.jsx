import React from 'react'

import { Typography } from '@mui/material'
import Modal from 'components/Modal'

const ConfirmModal = ({
  title = 'Tem a certeza?',
  text = 'Tem a certeza que quer continuar?',
  open,
  onClose,
  onConfirm,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      actions={[
        { label: 'Confirmar', onClick: onConfirm },
        { label: 'Cancelar', onClick: onClose },
      ]}
      title={title}
    >
      <Typography>{text}</Typography>
    </Modal>
  )
}

export default ConfirmModal
