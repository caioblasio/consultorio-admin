import React, { useMemo } from 'react'
import { Stack, Typography, Grid } from '@mui/material'
import useDateAdapter from 'hooks/useDateAdapter'

import { PAYMENT_TYPE_OPTIONS } from 'pages/Payments/Planner/FormModal/constants'
import { StyledError, StyledInfo } from './styles'

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

const CellPatients = ({
  item: { data: { type, madeAt, holder } = {} },
  status: { color, id } = {},
}) => {
  const adapter = useDateAdapter()

  if (id === 'forgiven') {
    return <StyledInfo color={color} />
  }

  if (id === 'owing') {
    return <StyledError color={color} />
  }

  const typeLabel = useMemo(() => {
    const { label } = PAYMENT_TYPE_OPTIONS.find(({ value }) => value === type)
    return label
  }, [type])

  return (
    <Stack>
      <Typography component="span" color={`${color}.dark`}>
        {holder}
      </Typography>
      <Grid container justifyContent="space-between">
        <Grid item>
          <Text text={typeLabel} color={color} />
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

export default CellPatients
