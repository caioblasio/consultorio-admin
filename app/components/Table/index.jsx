import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { StyledTableCell } from './styles'

const DefaultTableRow = ({ row }) => {
  return (
    <>
      {row.map((elem, idx) => {
        return (
          <TableCell key={`td-${row.id}-${idx}`} component="td" scope="row">
            {elem}
          </TableCell>
        )
      })}
    </>
  )
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

const BasicTable = ({ data, columns, children }) => {
  return (
    <TableContainer>
      <Table elevation={0} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <StyledTableCell key={column}>{column}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        {data && data.length ? <TableDefaultContent rows={data} /> : children}
      </Table>
    </TableContainer>
  )
}

export default BasicTable
