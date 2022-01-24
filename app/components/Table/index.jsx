import React from 'react'
import {
  Table as MuiTable,
  TableBody,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import InboxIcon from '@mui/icons-material/Inbox'

import Loader from 'components/Loader'

import {
  StyledTableLoader,
  StyledTableContainer,
  StyledTableCell,
  StyledTableNoData,
} from './styles'

const TableLoader = () => {
  return (
    <StyledTableLoader>
      <Loader />
    </StyledTableLoader>
  )
}

const TableNoData = () => {
  return (
    <StyledTableNoData spacing={2} alignItems="center">
      <InboxIcon align="center" fontSize="large" color="grey" />
      <Typography
        component="span"
        variant="body1"
        color="grey.dark"
        fontWeight="600"
      >
        No Data
      </Typography>
    </StyledTableNoData>
  )
}

const DefaultTableRow = ({ row }) => {
  return row.map((elem, idx) => {
    return (
      <StyledTableCell key={`td-${row.id}-${idx}`} component="td" scope="row">
        {elem}
      </StyledTableCell>
    )
  })
}

const TableDefaultContent = ({ rows }) => {
  const parsedRows = rows.map((row) => Object.values(row))
  return (
    <TableBody>
      {parsedRows.map((row, index) => (
        <TableRow key={`tr-${index}`}>
          <DefaultTableRow row={row} />
        </TableRow>
      ))}
    </TableBody>
  )
}

const Table = ({ data = [], columns = [], isLoading = true }) => {
  return (
    <StyledTableContainer>
      <MuiTable>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <StyledTableCell key={column}>
                <Typography variant="table">{column}</Typography>
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        {!isLoading && data.length > 0 && <TableDefaultContent rows={data} />}
      </MuiTable>
      {isLoading ? <TableLoader /> : data.length === 0 && <TableNoData />}
    </StyledTableContainer>
  )
}

export default Table
