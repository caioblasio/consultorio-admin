import React from 'react'
import { InputAdornment, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

const SearchField = (props) => {
  return (
    <TextField
      {...props}
      InputProps={{
        ...props.InputProps,
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  )
}

SearchField.defaultProps = {
  placeholder: 'Buscar...',
}

export default SearchField
