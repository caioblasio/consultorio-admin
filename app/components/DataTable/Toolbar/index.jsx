import React from 'react'
import { Grid, Button } from '@mui/material'
import CloudDownloadIcon from '@mui/icons-material/CloudDownload'

import SearchField from 'components/SearchField'

import { StyledContainer } from './styles'

const DataTableToolbar = ({
  searchValue,
  onCreateClick,
  onExportClick,
  onSearchChange,
}) => {
  return (
    <StyledContainer>
      <Grid container direction="row-reverse" spacing={2}>
        {onCreateClick && (
          <Grid item>
            <Button variant="contained" color="primary" onClick={onCreateClick}>
              Criar Paciente
            </Button>
          </Grid>
        )}
        {onExportClick && (
          <Grid item>
            <Button
              startIcon={<CloudDownloadIcon />}
              variant="outlined"
              onClick={onExportClick}
            >
              Exportar
            </Button>
          </Grid>
        )}
        {onSearchChange && (
          <Grid item xs>
            <SearchField onChange={onSearchChange} value={searchValue} />
          </Grid>
        )}
      </Grid>
    </StyledContainer>
  )
}

export default DataTableToolbar
