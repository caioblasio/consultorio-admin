import React from 'react'
import { Typography } from '@mui/material'

const HolderSubOption = ({ data }) => {
  return (
    <Typography
      display="block"
      component="div"
      variant="body2"
      color="grey.dark"
    >
      {data.cpf}
    </Typography>
  )
}

export default HolderSubOption
