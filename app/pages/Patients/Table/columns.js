import Active from 'components/Active'

const columns = [
  { field: 'name', headerName: 'Nome Completo', width: 250 },
  {
    field: 'phone',
    headerName: 'N° Celular',
    width: 470,
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
