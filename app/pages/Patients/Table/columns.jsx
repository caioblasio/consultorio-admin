import React from 'react'
import { Stack, Chip } from '@mui/material'
import { patientURL } from 'configs/urls'
import Active from 'components/Active'
import NavLink from 'containers/NavLink'

const columns = [
  {
    field: 'name',
    headerName: 'Nome Completo',
    width: 250,
    renderCell: ({ value, id }) => (
      <NavLink underline="always" to={patientURL(id)}>
        {value}
      </NavLink>
    ),
  },
  {
    field: 'phone',
    headerName: 'N° Celular',
    width: 450,
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
    field: 'cpf',
    headerName: 'CPF',
    width: 250,
  },
]

export default columns
