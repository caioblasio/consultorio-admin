import React, { useCallback, useContext } from 'react'
import { Grid, Typography } from '@mui/material'

import { DateContext } from 'contexts/Date'
import PlannerCell from 'components/Planner/Cell'
import { VISIBLE_MONTHS } from 'components/Planner/constants'
import {
  StyledHeaderGridItem,
  StyledBodyGridItem,
  StyledLoader,
  StyledPaper,
  StyledNoData,
} from './styles'

const PlannerBody = ({ data, pivotDate, rows, typeMapping, isLoading }) => {
  const adapter = useContext(DateContext)
  const renderElements = useCallback(
    (id, isBottom) => {
      const elements = []
      const rowData = data.filter(({ rowId }) => rowId === id)
      const firstMonth = new Date(pivotDate.toISOString())
      firstMonth.setMonth(firstMonth.getMonth() - VISIBLE_MONTHS + 1)

      for (let i = 0; i < VISIBLE_MONTHS; i += 1) {
        const currentMonth = new Date(firstMonth.toISOString())
        currentMonth.setMonth(currentMonth.getMonth() + i)
        const startMonth = currentMonth.getMonth()
        const startYear = currentMonth.getFullYear()

        const item = rowData.find(({ reference }) => {
          return (
            reference.getMonth() === startMonth &&
            reference.getFullYear() === startYear
          )
        })
        elements.push(
          <StyledBodyGridItem
            item
            key={`body-item-${id}-${i}`}
            isLeft={i === 0}
            isBottom={isBottom}
            isRight={i === VISIBLE_MONTHS - 1}
            xs
          >
            {item ? (
              <PlannerCell
                status={{ ...typeMapping[item.status], id: item.status }}
                title={item.holder}
                text={item.type}
                optionalText={adapter.format(item.createdAt, 'MM/yyyy')}
              />
            ) : (
              <PlannerCell />
            )}
          </StyledBodyGridItem>
        )
      }

      return elements
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
