import React from 'react'
import { Grid, Tooltip } from '@mui/material'
import { CloudDoneOutlined } from '@mui/icons-material'

import {
  StyledGrid,
  StyledIcon,
  StyledText,
  StyledSyncOutlined,
} from './styles'

const Page = ({
  breadcrumbs,
  children,
  className,
  disableAutoSave,
  isSaving,
}) => {
  return (
    <StyledGrid
      container
      spacing={8}
      className={className}
      direction="column"
      wrap="nowrap"
    >
      {(breadcrumbs || !disableAutoSave) && (
        <Grid item>
          <Grid
            container
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
          >
            {breadcrumbs && <Grid item>{breadcrumbs}</Grid>}
            {!disableAutoSave && (
              <Grid item>
                <Tooltip
                  title="Qualquer nova alteração é automaticamente salva no servidor."
                  placement="top-end"
                >
                  <div>
                    <StyledIcon
                      fontSize="small"
                      component={
                        isSaving ? StyledSyncOutlined : CloudDoneOutlined
                      }
                    />
                    <StyledText
                      component="span"
                      color="grey.dark"
                      variant="body2"
                    >
                      {isSaving
                        ? 'Salvando as suas novas alterações...'
                        : 'Todas as suas alterações estão salvas'}
                    </StyledText>
                  </div>
                </Tooltip>
              </Grid>
            )}
          </Grid>
        </Grid>
      )}
      <Grid item xs>
        {children}
      </Grid>
    </StyledGrid>
  )
}

export default Page
