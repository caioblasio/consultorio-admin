import React from 'react'
import { Stack } from '@mui/material'
import { holderURL, patientURL } from 'configs/urls'
import NavLink from 'containers/NavLink'

const getColumns = () => [
  {
    field: 'name',
    headerName: 'Nome Completo',
    width: 250,
    renderCell: ({ value, id }) => (
      <NavLink underline="always" to={holderURL(id)}>
        {value}
      </NavLink>
    ),
  },
  {
    field: 'cpf',
    headerName: 'CPF',
    width: 250,
  },
  {
    field: 'patients',
    headerName: 'Pacientes',
    width: 450,
    renderCell: ({ value }) => (
      <Stack direction="row" spacing={1}>
        {value.map((v, index) => (
          <NavLink
            key={`${v}-${index}`}
            underline="always"
            to={patientURL(v?.id)}
          >
            {v?.name}
          </NavLink>
        ))}
      </Stack>
    ),
  },
]

export default getColumns
