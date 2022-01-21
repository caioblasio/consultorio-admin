import React from 'react'
import BasicTable from 'components/Table'
import { formatCPF, formatPhone } from 'utils'
import { ActiveDot, InactiveDot } from './styles'

const Table = ({ data }) => {
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
    phone: formatPhone(patient.phone),
    email: patient.email,
    cpf: formatCPF(patient.cpf),
    isActive: patient.isActive ? <ActiveDot /> : <InactiveDot />,
  })

  const getUIRows = () => data.map((patient) => createRow(patient))

  return <BasicTable columns={columns} data={getUIRows()} />
}

export default Table
