import React from 'react'
import { Stack, Typography } from '@mui/material'
import InboxIcon from '@mui/icons-material/Inbox'

const NoData = ({ className }) => {
  return (
    <Stack spacing={2} alignItems="center" className={className}>
      <InboxIcon align="center" fontSize="large" color="grey" />
      <Typography component="span" color="grey.main" fontWeight="600">
        Sem Dados
      </Typography>
    </Stack>
  )
}

export default NoData
