import React from 'react'
import { Typography } from '@mui/material'

const LogoTitle = ({ className }) => (
  <div className={className}>
    <Typography component="span" variant="h1" fontWeight="600">
      Dental
    </Typography>
    <Typography
      component="span"
      variant="h1"
      color="primary.main"
      fontWeight="600"
    >
      +
    </Typography>
  </div>
)

export default LogoTitle
