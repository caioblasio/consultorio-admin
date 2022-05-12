import React, { useMemo } from 'react'
import LoaderContainer from 'components/LoaderContainer'
import PlannerRow from 'components/Planner/Row'

import { StyledPaper, StyledNoData } from './styles'

const PlannerBody = ({
  data,
  rows,
  typeMapping,
  isLoading,
  disableCellClick,
  onCellClick,
  columns,
  components: { CellRenderer, CellActions, RowHeader, Row = PlannerRow },
}) => {
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
          <Row
            key={`row-${row.id}`}
            data={data}
            row={row}
            isLast={index === rows.length - 1}
            columns={columns}
            typeMapping={typeMapping}
            disableCellClick={disableCellClick}
            onCellClick={onCellClick}
            components={{
              CellRenderer,
              CellActions,
              Header: RowHeader,
            }}
          />
        ))
      )}
    </StyledPaper>
  )
}

export default PlannerBody
