import React, { useState } from 'react'
import { Menu, MenuItem } from '@mui/material'

import PlannerCell from 'components/Planner/Cell'
import { StyledErrorItem } from './styles'

const PlannerCellContent = ({
  onEdit,
  onDelete,
  children,
  status: { color } = {},
}) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const handleClick =
    onEdit || onDelete
      ? (event) => {
          setAnchorEl(event.currentTarget)
        }
      : undefined

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <PlannerCell color={color} onClick={handleClick}>
        {children}
      </PlannerCell>
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
        onClose={handleClose}
      >
        {onEdit && (
          <MenuItem
            onClick={() => {
              onEdit()
              handleClose()
            }}
          >
            Editar
          </MenuItem>
        )}
        {onDelete && (
          <StyledErrorItem
            onClick={() => {
              onDelete()
              handleClose()
            }}
          >
            Deletar
          </StyledErrorItem>
        )}
      </Menu>
    </>
  )
}

export default PlannerCellContent
