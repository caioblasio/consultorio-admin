import React from 'react'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import { MenuItem } from '@mui/material'
import TextField from 'components/TextField'
import Loader from 'components/Loader'

import { StyledAutocomplete, StyledHighlightedText } from './styles'

const Autocomplete = ({
  startAdornment,
  isLoading = false,
  options = [],
  label,
  value,
  onChange,
  ...rest
}) => {
  return (
    <StyledAutocomplete
      options={options}
      size="small"
      loading={isLoading}
      noOptionsText="Sem opções"
      loadingText="Carregando..."
      disableClearable
      onChange={(_, newOption) => onChange(newOption)}
      value={value}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderInput={({ InputProps: { className, ref }, ...restProps }) => (
        <TextField
          {...restProps}
          InputProps={{
            className,
            ref,
          }}
          label={label}
          endAdornment={isLoading ? <Loader size="small" /> : undefined}
          startAdornment={startAdornment}
        />
      )}
      renderOption={(props, option, { inputValue }) => {
        const matches = match(option.label, inputValue)
        const parts = parse(option.label, matches)

        return (
          <MenuItem {...props}>
            <div>
              {parts.map((part, index) => (
                <StyledHighlightedText
                  component="span"
                  key={index}
                  isHighlighted={part.highlight}
                >
                  {part.text}
                </StyledHighlightedText>
              ))}
            </div>
          </MenuItem>
        )
      }}
      {...rest}
    />
  )
}

export default Autocomplete
