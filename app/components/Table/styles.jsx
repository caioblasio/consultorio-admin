import { Stack, TableContainer } from '@mui/material'
import { styled } from '@mui/material/styles'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'

export const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  position: 'relative',
  minHeight: theme.spacing(24),
}))

export const StyledTableNoData = styled(Stack)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(10),
  left: '50%',
  transform: 'translateX(-50%)',
}))

export const StyledTableLoader = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(10),
  left: '50%',
  transform: 'translateX(-50%)',
}))

export const StyledTableCell = styled(TableCell)({
  [`&.${tableCellClasses.head}`]: {
    border: 'none',
  },
})
