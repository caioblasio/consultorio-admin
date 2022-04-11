import React, { forwardRef } from 'react'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import { MenuItem } from '@mui/material'
import TextField from 'components/TextField'
import Loader from 'components/Loader'

import { createFilterOptions } from '@mui/material/Autocomplete'

import { StyledAutocomplete, StyledHighlightedText } from './styles'

const filter = createFilterOptions()

const Autocomplete = (
  {
    startAdornment,
    isLoading = false,
    options = [],
    content,
    label,
    value,
    onChange,
    hasCreateOption,
    InputProps,
    ...rest
  },
  ref
) => {
  const hasCreateOptionProps = hasCreateOption
    ? {
        onChange: (_, newOption) => {
          if (newOption && newOption.inputValue) {
            // will pass only string to onChange
            // we can differentiate a new option from an existing by typeof
            onChange(newOption.inputValue)
            return
          }
          onChange(newOption)
        },
        filterOptions: (options, params) => {
          const filtered = filter(options, params)

          const { inputValue } = params

          const isExisting = options.some(
            (option) => inputValue === option.label
          )
          if (inputValue !== '' && !isExisting) {
            filtered.push({
              inputValue,
              label: `Criar "${inputValue}"`,
            })
          }

          return filtered
        },
        getOptionLabel: (option) => {
          if (typeof option === 'string') {
            return option
          }
          if (option.inputValue) {
            return option.inputValue
          }

          return option.label
        },
        freeSolo: true,
        clearOnBlur: true,
        selectOnFocus: true,
      }
    : {}

  return (
    <StyledAutocomplete
      ref={ref}
      options={options}
      size="small"
      loading={isLoading}
      noOptionsText="Sem opções"
      loadingText="Carregando..."
      disableClearable
      onChange={(_, newOption) => onChange(newOption)}
      value={value || null}
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
          {...InputProps}
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
            {content && content(option)}
          </MenuItem>
        )
      }}
      {...hasCreateOptionProps}
      {...rest}
    />
  )
}

export default forwardRef(Autocomplete)
