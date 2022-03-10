import React, { forwardRef } from 'react'
import classnames from 'classnames'
import { InputAdornment } from '@mui/material'

import { StyledTextField } from './styles'

const TextField = (
  {
    label,
    value,
    startAdornment,
    endAdornment,
    variant,
    helperText,
    placeholder,
    error,
    type = 'text',
    className = '',
    onChange,
    InputProps,
    readOnly = false,
    ...rest
  },
  ref
) => {
  return (
    <StyledTextField
      type={type}
      ref={ref}
      error={error}
      variant={variant}
      helperText={helperText}
      placeholder={placeholder}
      className={classnames(
        { 'MuiTextField-root-adornedStart': startAdornment },
        { 'MuiTextField-root-adornedEnd': endAdornment },
        className
      )}
      label={label}
      value={value}
      onChange={onChange && ((event) => onChange(event, event.target.value))}
      InputProps={{
        startAdornment: startAdornment ? (
          <InputAdornment position="start">{startAdornment}</InputAdornment>
        ) : undefined,
        endAdornment: endAdornment ? (
          <InputAdornment position="end">{endAdornment}</InputAdornment>
        ) : undefined,
        readOnly,
        ...InputProps,
      }}
      {...rest}
    />
  )
}

export default forwardRef(TextField)
