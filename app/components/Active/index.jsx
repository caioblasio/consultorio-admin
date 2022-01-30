import React from 'react'

import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import FiberManualRecordOutlinedIcon from '@mui/icons-material/FiberManualRecordOutlined'

const Active = ({ value }) => {
  return value ? (
    <FiberManualRecordIcon fontSize="small" color="success" />
  ) : (
    <FiberManualRecordOutlinedIcon fontSize="small" color="grey" />
  )
}

export default Active
