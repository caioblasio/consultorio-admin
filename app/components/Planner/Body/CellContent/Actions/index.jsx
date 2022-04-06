import React from 'react'
import { Menu } from '@mui/material'

const PlannerCellActions = ({
  children,
  editAction,
  deleteAction,
  anchorEl,
  onClose,
}) => {
  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'right',
        vertical: 'center',
      }}
      transformOrigin={{
        horizontal: 'left',
        vertical: 'center',
      }}
      open={!!anchorEl}
      onClose={onClose}
    >
      {children}
      {editAction}
      {deleteAction}
    </Menu>
  )
}

export default PlannerCellActions
