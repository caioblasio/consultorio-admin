import React from 'react'
import { InputAdornment, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

const SearchField = ({
  placeholder = 'Buscar...',
  InputProps = {},
  ...rest
}) => {
  return (
    <TextField
      {...rest}
      placeholder={placeholder}
      InputProps={{
        ...InputProps,
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  )
}

export default SearchField
