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
  disabled = false,
  onSearchChange,
  children,
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
              disabled={disabled}
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
              disabled={disabled}
            >
              {exportLabel}
            </Button>
          </Grid>
        )}
        {children && <Grid item>{children}</Grid>}
        {onSearchChange && (
          <Grid item xs>
            <SearchField
              onChange={onSearchChange}
              value={searchValue}
              placeholder={searchPlaceholder}
              disabled={disabled}
            />
          </Grid>
        )}
      </Grid>
    </StyledContainer>
  )
}

export default Toolbar
