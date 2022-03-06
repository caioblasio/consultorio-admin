import { Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import React, { forwardRef, useState } from 'react'
import TextField from 'components/TextField'

const PasswordField = (
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
  const [show, setShow] = useState(false)
  return (
    <TextField
      type={show ? 'text' : 'password'}
      ref={ref}
      error={error}
      variant={variant}
      helperText={helperText}
      placeholder={placeholder}
      className={className}
      disabled={disabled}
      readOnly={readOnly}
      label={label}
      value={value}
      onChange={onChange}
      startAdornment={startAdornment}
      endAdornment={
        <IconButton size="small" onClick={() => setShow(!show)}>
          {show ? <Visibility /> : <VisibilityOff />}
        </IconButton>
      }
    />
  )
}

export default forwardRef(PasswordField)
