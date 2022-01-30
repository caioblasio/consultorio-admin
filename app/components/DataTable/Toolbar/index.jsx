import React from 'react'
import { Grid, Button } from '@mui/material'
import { GridToolbarExport } from '@mui/x-data-grid'
import AddIcon from '@mui/icons-material/Add'

import SearchField from 'components/SearchField'

import { StyledContainer } from './styles'

const DataTableToolbar = ({
  searchValue,
  onCreateClick,
  disableExport = false,
  onSearchChange,
  components: { CreateButtonIcon = AddIcon },
  localeText: { createLabel = 'Criar', searchPlaceholder },
}) => {
  return (
    <StyledContainer>
      <Grid container direction="row-reverse" spacing={2}>
        {onCreateClick && (
          <Grid item>
            <Button
              startIcon={<CreateButtonIcon />}
              variant="contained"
              color="primary"
              size="small"
              onClick={onCreateClick}
            >
              {createLabel}
            </Button>
          </Grid>
        )}
        {!disableExport && (
          <Grid item>
            <GridToolbarExport variant="outlined" color="grey" size="small" />
          </Grid>
        )}
        {onSearchChange && (
          <Grid item xs>
            <SearchField
              onChange={({ target }) => onSearchChange(target.value)}
              value={searchValue}
              placeholder={searchPlaceholder}
            />
          </Grid>
        )}
      </Grid>
    </StyledContainer>
  )
}

export default DataTableToolbar
