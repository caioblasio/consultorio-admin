import React, { useCallback, useMemo } from 'react'
import { Grid, Typography } from '@mui/material'

import { StyledCircle, StyledItem } from './styles'

const PlannerLegend = ({ typeMapping }) => {
  const types = useMemo(() => Object.entries(typeMapping), [typeMapping])
  const renderElements = useCallback(() => {
    const elements = []
    for (let i = 0; i < types.length; i += 1) {
      const [id, type] = types[i]
      elements.push(
        <StyledItem key={`item-${id}`}>
          <StyledCircle color={type.color} fontSize="small" />
          <Typography component="span" variant="caption" color="grey.dark">
            {type.label}
          </Typography>
        </StyledItem>
      )
    }

    return elements
  }, [typeMapping])

  return (
    <Grid container alignItems="center" justifyContent="flex-end">
      {renderElements()}
    </Grid>
  )
}

export default PlannerLegend
