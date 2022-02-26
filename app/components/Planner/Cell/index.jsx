import React, { useMemo } from 'react'
import { Stack, Typography, Grid } from '@mui/material'

import { StyledBox, StyledError } from './styles'

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

const PlannerCell = ({
  title,
  text,
  optionalText,
  status: { color, id, type } = {},
}) => {
  const content = useMemo(() => {
    let newContent
    switch (type) {
      case 'error':
        newContent = <StyledError color={color} />
        break

      default:
        newContent = (
          <Stack>
            <Typography component="span" color={`${color}.dark`}>
              {title}
            </Typography>
            <Grid container justifyContent="space-between">
              <Grid item>
                <Text text={text} color={color} />
              </Grid>
              <Grid item>
                {optionalText && <Text text={optionalText} color={color} />}
              </Grid>
            </Grid>
          </Stack>
        )

        break

      case 'error':
        newContent = <StyledError color={color} />
        break
    }

    return newContent
  }, [id, color])
  return <StyledBox color={color}>{content}</StyledBox>
}

export default PlannerCell
