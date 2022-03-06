import React from 'react'
import TextField from 'components/TextField'
import Loader from 'components/Loader'

import { StyledAutocomplete } from './styles'

const Autocomplete = ({
  startAdornment,
  isLoading = false,
  options = [],
  label,
  ...rest
}) => {
  return (
    <StyledAutocomplete
      options={options}
      size="small"
      noOptionsText="Sem opções"
      disableClearable
      renderInput={({ InputProps: { className }, ...restProps }) => (
        <TextField
          {...restProps}
          InputProps={{
            className,
          }}
          label={label}
          endAdornment={isLoading ? <Loader size="small" /> : undefined}
          startAdornment={startAdornment}
        />
      )}
      {...rest}
    />
  )
}

export default Autocomplete
