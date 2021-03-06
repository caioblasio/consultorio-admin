import React from 'react'

import { Grid, Link as MuiLink, Typography } from '@mui/material'

const Link = ({
  className,
  icon,
  to,
  children,
  onClick,
  component,
  color,
  variant,
  ...rest
}) => {
  const content = (
    <Typography variant={variant} component="span">
      {children}
    </Typography>
  )
  return (
    <MuiLink
      color={color}
      className={className}
      href={to}
      onClick={onClick}
      component={component}
      {...rest}
    >
      {icon ? (
        <Grid container spacing={1}>
          <Grid item>{icon}</Grid>
          <Grid item>{content}</Grid>
        </Grid>
      ) : (
        content
      )}
    </MuiLink>
  )
}

export default Link
