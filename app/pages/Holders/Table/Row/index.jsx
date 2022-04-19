import React from 'react'
import { StyledRow } from './styles'

const HoldersRow = (props) => {
  return <StyledRow {...props} isActive={props.row.isActive} />
}

export default HoldersRow
