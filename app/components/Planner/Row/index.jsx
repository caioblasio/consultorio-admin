import React, { useCallback } from 'react'
import { Grid, Typography } from '@mui/material'
import { Mode } from 'constants/mode'
import PlannerCellEmpty from 'components/Planner/Body/CellEmpty'
import PlannerCellContent from 'components/Planner/Body/CellContent'

import { StyledHeaderGridItem, StyledBodyGridItem } from './styles'

const PlannerRow = ({
  data,
  row,
  isLast,
  typeMapping,
  disableCellClick,
  onCellClick,
  columns,
  className,
  components: {
    CellRenderer,
    CellActions,
    Header = ({ label }) => <Typography component="span">{label}</Typography>,
  },
}) => {
  const renderCell = useCallback(
    (id, date, item) => {
      const position = { rowId: id, columnId: date }
      const status =
        typeMapping && item
          ? { ...typeMapping[item.status], id: item.status }
          : undefined

      if (item) {
        return (
          <PlannerCellContent
            components={{
              CellActions,
            }}
            status={status}
            onDelete={() => onCellClick(Mode.DELETE, item)}
            onEdit={() => onCellClick(Mode.EDIT, item)}
            onCreate={() => onCellClick(Mode.CREATE, position)}
            disableClick={disableCellClick(item)}
          >
            <CellRenderer data={data} row={row} item={item} status={status} />
          </PlannerCellContent>
        )
      }

      return (
        <PlannerCellEmpty
          disableClick={disableCellClick(position)}
          onCreate={() => onCellClick(Mode.CREATE, position)}
        />
      )
    },
    [disableCellClick, data]
  )

  const renderElements = useCallback(
    (id, isBottom) => {
      const rowData = data.filter(({ rowId }) => rowId === id)

      return columns.map(({ date }, index) => {
        const year = date.getFullYear()
        const month = date.getMonth()

        const item = rowData.find(({ columnId }) => {
          return (
            columnId.getMonth() === month && columnId.getFullYear() === year
          )
        })

        return (
          <StyledBodyGridItem
            item
            key={`body-item-${id}-${month}`}
            isLeft={index === 0}
            isBottom={isBottom}
            isRight={index === columns.length - 1}
            xs
          >
            {renderCell(id, date, item)}
          </StyledBodyGridItem>
        )
      })
    },
    [columns, data]
  )

  return (
    <Grid container className={className}>
      <StyledHeaderGridItem item xs={2}>
        <Header row={row} />
      </StyledHeaderGridItem>
      {renderElements(row.id, isLast)}
    </Grid>
  )
}

export default PlannerRow
