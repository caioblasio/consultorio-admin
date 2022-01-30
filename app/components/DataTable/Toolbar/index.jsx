import React from 'react'
import { Grid, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import CloudDownloadIcon from '@mui/icons-material/CloudDownload'

import SearchField from 'components/SearchField'

import { StyledContainer } from './styles'

const DataTableToolbar = ({
  searchValue,
  onCreateClick,
  onExportClick,
  onSearchChange,
  components: { CreateButtonIcon = AddIcon },
  localeText: {
    createLabel = 'Criar',
    exportLabel = 'Exportar',
    searchPlaceholder,
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
              onClick={onCreateClick}
            >
              {createLabel}
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

export default DataTableToolbar
