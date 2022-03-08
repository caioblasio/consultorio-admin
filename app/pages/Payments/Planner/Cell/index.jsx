import React, { useContext } from 'react'
import { Stack, Typography, Grid } from '@mui/material'

import { DateContext } from 'contexts/Date'

const Text = ({ text, color }) => (
  <Typography
    component="span"
    variant="caption"
    fontSize="0.6rem"
    color={`${color}.dark`}
  >
    {text}
  </Typography>
)

const PaymentsCell = ({
  data: { type, createdAt, holder } = {},
  status: { color } = {},
}) => {
  const adapter = useContext(DateContext)
  return (
    <Stack>
      <Typography component="span" color={`${color}.dark`}>
        {holder}
      </Typography>
      <Grid container justifyContent="space-between">
        <Grid item>
          <Text text={type} color={color} />
        </Grid>
        <Grid item>
          {createdAt && (
            <Text text={adapter.format(createdAt, 'MM/yyyy')} color={color} />
          )}
        </Grid>
      </Grid>
    </Stack>
  )
}

export default PaymentsCell
