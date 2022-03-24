import React, { useCallback, useMemo } from 'react'
import { Grid, Typography } from '@mui/material'
import LoaderContainer from 'components/LoaderContainer'
import { Mode } from 'constants/mode'
import PlannerCellEmpty from './CellEmpty'
import PlannerCellContent from './CellContent'

import {
  StyledHeaderGridItem,
  StyledBodyGridItem,
  StyledPaper,
  StyledNoData,
} from './styles'

const PlannerBody = ({
  data,
  rows,
  typeMapping,
  isLoading,
  onCellClick,
  columns,
  view,
  components: {
    CellRenderer,
    RowHeader = ({ label }) => (
      <Typography component="span">{label}</Typography>
    ),
  },
}) => {
  const renderReferenceElements = useCallback(
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
        const status = item
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
                status={status}
                onDelete={() => onCellClick(Mode.DELETE, item)}
                onEdit={() => onCellClick(Mode.EDIT, item)}
              >
                <CellRenderer data={item.data} status={status} />
              </PlannerCellContent>
            ) : (
              <PlannerCellEmpty
                onCreate={() =>
                  onCellClick(Mode.CREATE, { rowId: id, columnId: date })
                }
              />
            )}
          </StyledBodyGridItem>
        )
      })
    },
    [rows, data, columns]
  )

  const renderIncomeElements = useCallback((id, isBottom) => {
    const rowData = data.filter(({ rowId }) => rowId === id)

    return columns.map(({ date }, index) => {
      const year = date.getFullYear()
      const month = date.getMonth()

      const total = rowData.reduce((acc, { columnId, data: { value } }) => {
        return columnId.getMonth() === month && columnId.getFullYear() === year
          ? acc + value
          : 0
      }, 0)

      return (
        <StyledBodyGridItem
          item
          key={`body-item-${id}-${month}`}
          isLeft={index === 0}
          isBottom={isBottom}
          isRight={index === columns.length - 1}
          xs
        >
          <CellRenderer data={total} />
        </StyledBodyGridItem>
      )
    })
  })

  const isEmpty = useMemo(
    () => data.length === 0 || rows.length === 0,
    [data, rows]
  )

  return (
    <StyledPaper isEmpty={isLoading || isEmpty}>
      {isLoading ? (
        <LoaderContainer />
      ) : isEmpty ? (
        <StyledNoData />
      ) : (
        rows.map((row, index) => (
          <Grid container key={`row-${row.id}`}>
            <StyledHeaderGridItem item xs={2}>
              <RowHeader row={row} />
            </StyledHeaderGridItem>
            {view === 'reference'
              ? renderReferenceElements(row.id, index === rows.length - 1)
              : renderIncomeElements(row.id, index === rows.length - 1)}
          </Grid>
        ))
      )}
    </StyledPaper>
  )
}

export default PlannerBody
