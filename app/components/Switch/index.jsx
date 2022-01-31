import React, { forwardRef } from 'react'
import { FormControlLabel } from '@mui/material'

import { StyledSwitch } from './styles'

const Switch = ({ label, value = false, ...rest }, ref) => {
  return (
    <FormControlLabel
      control={<StyledSwitch ref={ref} checked={value} {...rest} />}
      label={label}
    />
  )
}

export default forwardRef(Switch)
