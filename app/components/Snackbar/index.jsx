import React from 'react'
import { Snackbar as MuiSnackbar } from '@mui/material'
import Alert from 'components/Alert'

const Snackbar = ({ severity, children, open = false, onClose, title }) => {
  return (
    <MuiSnackbar open={open} onClose={onClose}>
      <Alert severity={severity} onClose={onClose} title={title}>
        {children}
      </Alert>
    </MuiSnackbar>
  )
}

export default Snackbar
