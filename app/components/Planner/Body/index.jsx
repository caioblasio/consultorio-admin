import React, { useCallback } from 'react'
import { Grid, Typography } from '@mui/material'

import PlannerCell from 'components/Planner/Cell'
import {
  StyledHeaderGridItem,
  StyledBodyGridItem,
  StyledLoader,
  StyledPaper,
  StyledNoData,
} from './styles'

const PlannerBody = ({
  data,
  pivotDate,
  rows,
  typeMapping,
  isLoading,
  onCellClick,
  columns,
  components: { CellRenderer },
}) => {
  const renderElements = useCallback(
    (id, isBottom) => {
      const elements = []
      const rowData = data.filter(({ rowId }) => rowId === id)

      return columns.map(({ label: month, date }) => {
        const year = date.getFullYear()

        const item = rowData.find(({ columnId }) => {
          return (
            columnId.getMonth() === month && columnId.getFullYear() === year
          )
        })
        const status = item
          ? { ...typeMapping[item.status], id: item.status }
          : undefined

        elements.push(
          <StyledBodyGridItem
            item
            key={`body-item-${id}-${month}`}
            isLeft={i === 0}
            isBottom={isBottom}
            isRight={i === VISIBLE_MONTHS - 1}
            xs
          >
            {item ? (
              <PlannerCell
                status={status}
                onClick={() =>
                  onCellClick({ rowId: id, columnId: month }, item.data)
                }
              >
                <CellRenderer data={item.data} status={status} />
              </PlannerCell>
            ) : (
              <PlannerCell
                onClick={() => onCellClick({ rowId: id, columnId: month })}
              />
            )}
          </StyledBodyGridItem>
        )
      })
    },
    [rows, pivotDate]
  )

  return (
    <StyledPaper>
      {isLoading ? (
        <StyledLoader />
      ) : data.length === 0 ? (
        <StyledNoData />
      ) : (
        rows.map(({ id, label }, index) => (
          <Grid container key={`row-${id}`}>
            <StyledHeaderGridItem item xs={2}>
              <Typography component="span">{label}</Typography>
            </StyledHeaderGridItem>
            {renderElements(id, index === rows.length - 1)}
          </Grid>
        ))
      )}
    </StyledPaper>
  )
}

export default PlannerBody
