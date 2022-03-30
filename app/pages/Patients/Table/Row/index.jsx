import React from 'react'
import { StyledRow } from './styles'

const PatientsRow = (props) => {
  return <StyledRow {...props} isActive={props.row.isActive} />
}

export default PatientsRow
