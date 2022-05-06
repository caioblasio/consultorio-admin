import React from 'react'
import { Stack, Typography } from '@mui/material'
import NavLink from 'containers/NavLink'
import { holderURL } from 'configs/urls'

const RowHeaderHolders = ({ row: { id, label, data } }) => {
  return (
    <Stack spacing={1}>
      <NavLink underline="always" to={holderURL(id)}>
        {label}
      </NavLink>
      <Typography variant="body2" color="grey.dark">
        {data.cpf}
      </Typography>
    </Stack>
  )
}

export default RowHeaderHolders
