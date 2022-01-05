import React from 'react'
import SearchIcon from '@mui/icons-material/Search'
import {
  StyledSearch,
  StyledSearchIconWrapper,
  StyledInputBase,
} from './styles'

const SearchBar = () => {
  return (
    <StyledSearch>
      <StyledSearchIconWrapper>
        <SearchIcon />
      </StyledSearchIconWrapper>
      <StyledInputBase
        placeholder="Buscar Pacientes..."
        inputProps={{ 'aria-label': 'search' }}
      />
    </StyledSearch>
  )
}

export default SearchBar
