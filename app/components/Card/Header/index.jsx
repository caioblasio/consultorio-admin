import React from 'react'
import { Grid, Typography, IconButton, Tooltip } from '@mui/material'

const CardHeader = ({ title, actions = [], className }) => {
  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      wrap="nowrap"
      className={className}
    >
      <Grid item xs>
        <Typography variant="h2" component="h2" align="center">
          {title}
        </Typography>
      </Grid>
      {actions.length > 0 &&
        actions.map(({ icon, onClick, label }) => (
          <Tooltip key={`action-${icon}`} title={label}>
            <IconButton onClick={onClick}>{icon}</IconButton>
          </Tooltip>
        ))}
    </Grid>
  )
}

export default CardHeader
