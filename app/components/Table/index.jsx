import React from 'react'
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'

const DefaultTableRow = ({ row }) => {
  return row.map((elem, idx) => {
    return (
      <TableCell key={`td-${row.id}-${idx}`} component="td" scope="row">
        {elem}
      </TableCell>
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

const Table = ({ data, columns, children }) => {
  return (
    <TableContainer>
      <MuiTable>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column}>
                <Typography variant="caption">{column}</Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        {data && data.length ? <TableDefaultContent rows={data} /> : children}
      </MuiTable>
    </TableContainer>
  )
}

export default Table
