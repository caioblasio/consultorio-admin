import React from 'react'
import { TextField, MenuItem } from '@mui/material'

const SelectField = ({ options = [], ...rest }) => {
  return (
    <TextField {...rest} select>
      {options.map(({ value, label }) => (
        <MenuItem key={value} value={value}>
          {label}
        </MenuItem>
      ))}
    </TextField>
  )
}

export default SelectField
