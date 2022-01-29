import Active from 'components/Active'

const columns = [
  { field: 'name', headerName: 'Nome Completo', width: 175 },
  {
    field: 'dob',
    headerName: 'Data de Nascimento',
    width: 175,
  },
  {
    field: 'phone',
    headerName: 'N° Celular',
    width: 175,
  },
  {
    field: 'email',
    headerName: 'E-mail',
    width: 175,
  },
  {
    field: 'cpf',
    headerName: 'CPF',
    width: 175,
  },
  {
    field: 'isActive',
    headerName: 'Ativo?',
    renderCell: ({ value }) => Active({ value }),
  },
]

export default columns
