import React, { useEffect, useState } from 'react'
import { Grid, Tooltip } from '@mui/material'
import { CloudDoneOutlined } from '@mui/icons-material'

import useDateAdapter from 'hooks/useDateAdapter'

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
  const adapter = useDateAdapter()
  const [dirty, setDirty] = useState(false)
  const [savingText, setSavingText] = useState(
    'Todas as suas alterações estão salvas'
  )

  useEffect(() => {
    if (isSaving) {
      setDirty(true)
      setSavingText('Salvando as suas novas alterações...')
      return
    }

    if (!dirty) {
      return
    }

    const saveTime = new Date()
    const updateText = () => {
      const distance = adapter.formatDistance(new Date(), saveTime)
      setSavingText(`Última alteração feita há ${distance}`)
    }

    updateText()
    const interval = setInterval(() => {
      updateText()
    }, [60000])

    return () => {
      clearInterval(interval)
    }
  }, [isSaving])

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
                <Tooltip title="Qualquer nova alteração é automaticamente salva no servidor.">
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
                      {savingText}
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
