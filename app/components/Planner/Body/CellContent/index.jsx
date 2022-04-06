import React, { useState } from 'react'
import { Menu, MenuItem } from '@mui/material'

import PlannerCell from 'components/Planner/Cell'
import PlannerCellActions from './Actions'
import { StyledErrorItem } from './styles'

const PlannerCellContent = ({
  onCreate,
  onEdit,
  onDelete,
  children,
  components: { CellActions = PlannerCellActions },
  status: { color, id: statusId } = {},
  disableClick,
}) => {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <PlannerCell
        color={color}
        onClick={disableClick ? undefined : handleClick}
      >
        {children}
      </PlannerCell>
      {!disableClick && (
        <CellActions
          statusId={statusId}
          anchorEl={anchorEl}
          onClose={handleClose}
          createAction={
            onCreate ? (
              <MenuItem
                onClick={() => {
                  onCreate()
                  handleClose()
                }}
              >
                Criar
              </MenuItem>
            ) : undefined
          }
          editAction={
            onEdit ? (
              <MenuItem
                onClick={() => {
                  onEdit()
                  handleClose()
                }}
              >
                Editar
              </MenuItem>
            ) : undefined
          }
          deleteAction={
            onDelete ? (
              <StyledErrorItem
                onClick={() => {
                  onDelete()
                  handleClose()
                }}
              >
                Deletar
              </StyledErrorItem>
            ) : undefined
          }
        />
      )}
    </>
  )
}

export default PlannerCellContent
