import React from 'react'
import {
  Alert as MuiAlert,
  AlertTitle,
  Snackbar,
  Typography,
} from '@mui/material'

const Alert = ({ severity, children, open = false, onClose, title }) => {
  return (
    <Snackbar open={open} onClose={onClose}>
      <MuiAlert severity={severity} onClose={onClose}>
        {title && (
          <AlertTitle>
            <Typography component="span" variant="title1">
              {title}
            </Typography>
          </AlertTitle>
        )}
        {children}
      </MuiAlert>
    </Snackbar>
  )
}

export default Alert
