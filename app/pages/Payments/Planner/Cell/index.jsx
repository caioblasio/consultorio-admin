import React from 'react'
import { Stack, Typography, Grid } from '@mui/material'
import useDateAdapter from 'hooks/useDateAdapter'

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
  data: { type, madeAt, holder } = {},
  status: { color } = {},
}) => {
  const adapter = useDateAdapter()
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
          {madeAt && (
            <Text
              text={adapter.formatByString(madeAt, 'MM/yyyy')}
              color={color}
            />
          )}
        </Grid>
      </Grid>
    </Stack>
  )
}

export default PaymentsCell
