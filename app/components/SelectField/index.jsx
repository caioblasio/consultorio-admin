import React from 'react'
import { MenuItem } from '@mui/material'
import TextField from 'components/TextField'

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
