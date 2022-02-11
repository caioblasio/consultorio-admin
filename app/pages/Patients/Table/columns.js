import React from 'react'
import Active from 'components/Active'

import { Stack, Chip } from '@mui/material'

const columns = [
  { field: 'name', headerName: 'Nome Completo', width: 250 },
  {
    field: 'phone',
    headerName: 'N° Celular',
    width: 470,
    renderCell: ({ value }) => (
      <Stack direction="row" spacing={1}>
        {value.map((v) => (
          <Chip key={v} label={v} onClick={() => {}} />
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
