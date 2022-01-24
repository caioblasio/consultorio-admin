import React from 'react'
import BasicTable from 'components/Table'
import { ActiveDot, InactiveDot } from './styles'

const Table = ({ data, isLoading }) => {
  const columns = [
    'Nome Completo',
    'Data de Nascimento',
    'Celular',
    'Email',
    'CPF',
    'Ativo?',
  ]

  const createRow = (patient) => ({
    name: patient.name,
    dob: patient.dob,
    phone: patient.phone,
    email: patient.email,
    cpf: patient.cpf,
    isActive: patient.isActive ? <ActiveDot /> : <InactiveDot />,
  })

  const getUIRows = () => data.map((patient) => createRow(patient))

  return (
    <BasicTable columns={columns} data={getUIRows()} isLoading={isLoading} />
  )
}

export default Table
