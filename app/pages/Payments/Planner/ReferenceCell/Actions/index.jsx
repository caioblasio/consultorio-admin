import React from 'react'
import { Menu } from '@mui/material'
import PlannerCellActions from 'components/Planner/Body/CellContent/Actions'

const ReferenceCellActions = ({
  createAction,
  editAction,
  deleteAction,
  anchorEl,
  onClose,
  statusId,
}) => {
  const isOwingPayment = statusId === 'owing'
  return (
    <PlannerCellActions
      editAction={!isOwingPayment && editAction}
      deleteAction={!isOwingPayment && deleteAction}
      anchorEl={anchorEl}
      onClose={onClose}
    >
      {isOwingPayment && createAction}
    </PlannerCellActions>
  )
}

export default ReferenceCellActions
