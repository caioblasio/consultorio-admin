import React, { useMemo, useState } from 'react'
import { Menu, MenuItem } from '@mui/material'

import PlannerCell from 'components/Planner/Cell'
import { StyledError, StyledErrorItem } from './styles'

const PlannerCellContent = ({
  onEdit,
  onDelete,
  children,
  status: { color, id, type } = {},
}) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const content = useMemo(() => {
    let newContent
    switch (type) {
      case 'error':
        newContent = <StyledError color={color} />
        break

      default:
        newContent = children
        break
    }

    return newContent
  }, [id, color])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <PlannerCell color={color} onClick={handleClick}>
        {content}
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
        <MenuItem
          onClick={() => {
            onEdit()
            handleClose()
          }}
        >
          Editar
        </MenuItem>
        <StyledErrorItem
          onClick={() => {
            onDelete()
            handleClose()
          }}
        >
          Deletar
        </StyledErrorItem>
      </Menu>
    </>
  )
}

export default PlannerCellContent
