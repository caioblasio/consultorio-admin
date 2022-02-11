import React, { forwardRef } from 'react'
import { Alert as MuiAlert, AlertTitle, Typography } from '@mui/material'

const Alert = ({ severity, children, onClose, title }, ref) => {
  return (
    <MuiAlert severity={severity} onClose={onClose} ref={ref}>
      {title && (
        <AlertTitle>
          <Typography component="span" variant="title1">
            {title}
          </Typography>
        </AlertTitle>
      )}
      {children}
    </MuiAlert>
  )
}

export default forwardRef(Alert)
