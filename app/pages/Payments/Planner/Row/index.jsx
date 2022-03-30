import React from 'react'
import { StyledRow } from './styles'

const PaymentsRow = (props) => {
  return <StyledRow {...props} isActive={props.row.isActive} />
}

export default PaymentsRow
