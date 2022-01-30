import React, { forwardRef } from 'react'
import { FormControlLabel, Switch as MuiSwitch } from '@mui/material'

const Switch = ({ label, value = false, ...rest }, ref) => {
  return (
    <FormControlLabel
      control={<MuiSwitch ref={ref} checked={value} {...rest} />}
      label={label}
    />
  )
}

export default forwardRef(Switch)
