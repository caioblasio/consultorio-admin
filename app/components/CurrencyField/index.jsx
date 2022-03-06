import React, { forwardRef } from 'react'
import { Typography } from '@mui/material'

import TextField from 'components/TextField'

const CurrencyField = (
  {
    label,
    value,
    startAdornment,
    variant,
    helperText,
    placeholder,
    error,
    className,
    onChange,
    disabled,
    readOnly,
  },
  ref
) => {
  return (
    <TextField
      ref={ref}
      error={error}
      variant={variant}
      helperText={helperText}
      placeholder={placeholder}
      className={className}
      label={label}
      value={value}
      onChange={onChange}
      startAdornment={startAdornment}
      endAdornment={<Typography>R$</Typography>}
      disabled={disabled}
      readOnly={readOnly}
    />
  )
}

export default forwardRef(CurrencyField)
