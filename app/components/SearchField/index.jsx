import React from 'react'
import { SearchRounded } from '@mui/icons-material'
import TextField from 'components/TextField'

const SearchField = ({
  placeholder = 'Buscar...',
  onChange,
  value,
  className,
  disabled,
}) => {
  return (
    <TextField
      className={className}
      value={value}
      onChange={(event) => onChange(event, event.target.value)}
      placeholder={placeholder}
      startAdornment={<SearchRounded />}
      disabled={disabled}
    />
  )
}

export default SearchField
