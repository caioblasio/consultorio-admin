import React from 'react'
import { SearchRounded } from '@mui/icons-material'
import TextField from 'components/TextField'

const SearchField = ({ placeholder = 'Buscar...', InputProps, ...rest }) => {
  return (
    <TextField
      {...rest}
      placeholder={placeholder}
      startAdornment={<SearchRounded />}
    />
  )
}

export default SearchField
