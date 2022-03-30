import React from 'react'
import { Stack, Typography, Grid } from '@mui/material'
import useDateAdapter from 'hooks/useDateAdapter'

import { StyledError } from './styles'

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

const ReferencePaymentsCell = ({
  item: { data: { type, madeAt, holder } = {} },
  status: { color, id } = {},
}) => {
  const adapter = useDateAdapter()

  if (id === 'owing') {
    return <StyledError color={color} />
  }

  return (
    <Stack>
      <Typography component="span" color={`${color}.dark`}>
        {holder}
      </Typography>
      <Grid container justifyContent="space-between">
        <Grid item>
          <Text text={type} color={color} />
        </Grid>
        {madeAt && (
          <Grid item>
            <Text
              text={adapter.formatByString(madeAt, 'MM/yyyy')}
              color={color}
            />
          </Grid>
        )}
      </Grid>
    </Stack>
  )
}

export default ReferencePaymentsCell
