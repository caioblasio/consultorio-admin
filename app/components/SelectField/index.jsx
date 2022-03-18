import React, { forwardRef } from 'react'
import { MenuItem } from '@mui/material'
import TextField from 'components/TextField'

const SelectField = ({ options = [], ...rest }, ref) => {
  return (
    <TextField {...rest} select ref={ref}>
      {options.map(({ value, label }) => (
        <MenuItem key={value} value={value}>
          {label}
        </MenuItem>
      ))}
    </TextField>
  )
}

export default forwardRef(SelectField)
