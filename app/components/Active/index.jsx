import React from 'react'

import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'

const Active = ({ value }) => {
  return (
    <FiberManualRecordIcon
      fontSize="small"
      color={value ? 'success' : 'grey'}
    />
  )
}

export default Active
