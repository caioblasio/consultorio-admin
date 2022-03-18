import React from 'react'
import { Stack, Chip, Typography } from '@mui/material'
import { patientURL } from 'configs/urls'
import Active from 'components/Active'
import NavLink from 'components/Link'

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
    width: 470,
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
    width: 175,
  },
  {
    field: 'isActive',
    headerName: 'Ativo?',
    width: 90,
    renderCell: ({ value }) => Active({ value }),
  },
]

export default columns
