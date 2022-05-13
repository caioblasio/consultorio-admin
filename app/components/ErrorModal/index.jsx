import React from 'react'

import { Typography } from '@mui/material'
import Modal from 'components/Modal'

const ErrorModal = ({
  open,
  onClose,
  localeText: { title, text } = {
    title: 'Erro!',
    text: 'Essa operação nao pode ser realizada',
  },
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      actions={[{ label: 'OK', onClick: onClose }]}
      title={title}
    >
      <Typography>{text}</Typography>
    </Modal>
  )
}

export default ErrorModal
