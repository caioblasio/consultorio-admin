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
  onCellClick,
  columns,
  className,
  components: {
    CellRenderer,
    CellActions,
    Header = ({ label }) => <Typography component="span">{label}</Typography>,
  },
}) => {
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
        const status =
          typeMapping && item
            ? { ...typeMapping[item.status], id: item.status }
            : undefined

        return (
          <StyledBodyGridItem
            item
            key={`body-item-${id}-${month}`}
            isLeft={index === 0}
            isBottom={isBottom}
            isRight={index === columns.length - 1}
            xs
          >
            {item ? (
              <PlannerCellContent
                components={{
                  CellActions,
                }}
                status={status}
                onDelete={
                  onCellClick ? () => onCellClick(Mode.DELETE, item) : undefined
                }
                onEdit={
                  onCellClick ? () => onCellClick(Mode.EDIT, item) : undefined
                }
                onCreate={
                  onCellClick
                    ? () =>
                        onCellClick(Mode.CREATE, { rowId: id, columnId: date })
                    : undefined
                }
                disableClick={!onCellClick}
              >
                <CellRenderer
                  data={data}
                  row={row}
                  item={item}
                  status={status}
                />
              </PlannerCellContent>
            ) : (
              <PlannerCellEmpty
                onCreate={
                  onCellClick
                    ? () =>
                        onCellClick(Mode.CREATE, { rowId: id, columnId: date })
                    : undefined
                }
              />
            )}
          </StyledBodyGridItem>
        )
      })
    },
    [data, columns]
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
