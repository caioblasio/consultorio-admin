import React from 'react'
import { Grid, Button } from '@mui/material'
import { AddRounded, SaveAltRounded } from '@mui/icons-material'

import SearchField from 'components/SearchField'

import { StyledContainer } from './styles'

const Toolbar = ({
  searchValue,
  onCreateClick,
  onExportClick,
  disableExport = false,
  onSearchChange,
  components: { CreateButtonIcon = AddRounded, ExportIcon = SaveAltRounded },
  localeText: {
    createLabel = 'Criar',
    searchPlaceholder = 'Buscar...',
    exportLabel = 'Exportar',
  },
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
            <Button
              variant="outlined"
              startIcon={<ExportIcon />}
              color="grey"
              size="small"
              onClick={onExportClick}
            >
              {exportLabel}
            </Button>
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

export default Toolbar
