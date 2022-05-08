import React from 'react'
import { Stack, Chip } from '@mui/material'
import { patientURL, holderURL } from 'configs/urls'
import NavLink from 'containers/NavLink'

const getColumns = ({ adapter, holders }) => [
  {
    field: 'name',
    headerName: 'Nome Completo',
    width: 280,
    renderCell: ({ value, id }) => (
      <NavLink underline="always" to={patientURL(id)}>
        {value}
      </NavLink>
    ),
  },
  {
    field: 'phone',
    headerName: 'N° Celular',
    width: 300,
    valueFormatter: ({ value }) => value.join(', '),
    renderCell: ({ value }) => (
      <Stack direction="row" spacing={1}>
        {value.map((v, index) => (
          <Chip key={`${v}-${index}`} label={v} onClick={() => {}} />
        ))}
      </Stack>
    ),
  },
  {
    field: 'holderId',
    headerName: 'Responsável',
    width: 200,
    renderCell: ({ value }) => (
      <NavLink underline="always" to={holderURL(value)}>
        {holders.find(({ id }) => id === value)?.label}
      </NavLink>
    ),
  },
  {
    field: 'treatmentBegin',
    headerName: 'Início do tratamento',
    valueFormatter: ({ value }) => adapter.formatByString(value, 'dd/MM/yyyy'),
    width: 200,
  },
]

export default getColumns
