import React from 'react'
import { Typography } from '@mui/material'

const LogoTitle = ({ className }) => (
  <div className={className}>
    <Typography component="span" variant="h1">
      Dental
    </Typography>
    <Typography component="span" variant="h1" color="primary.dark">
      +
    </Typography>
  </div>
)

export default LogoTitle
