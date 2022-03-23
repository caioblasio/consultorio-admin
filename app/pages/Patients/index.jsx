import React, { useContext, useState } from 'react'
import useAsyncEffect from 'use-async-effect'
import {
  fetchAllPatients,
  createPatient,
  editPatient,
  deletePatient,
} from 'api/database'
import Breadcrumbs from 'containers/Breadcrumbs'
import { SaveContext } from 'contexts/Save'
import Page from 'containers/Page'
import { unformatCPF } from 'utils/cpf'
import Table from './Table'

const PatientsPage = () => {
  const { onSaving } = useContext(SaveContext)
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useAsyncEffect(async (isMounted) => {
    const allPatients = await fetchAllPatients()
    if (!isMounted()) {
      return
    }

    setPatients(allPatients)
    setLoading(false)
  }, [])

  const filteredPatients = patients.filter(
    ({ name, phone, cpf }) =>
      name.toLowerCase().includes(search.toLowerCase()) ||
      phone.some((number) => number.includes(search)) ||
      unformatCPF(cpf).includes(search)
  )

  const onCreatePatient = async (patient) => {
    try {
      onSaving(true)
      const createdPatientId = await createPatient(patient)
      const newPatients = [...patients, { ...patient, id: createdPatientId }]
      setPatients(newPatients)
    } finally {
      onSaving(false)
    }
  }

  const onEditPatient = async (patient) => {
    try {
      onSaving(true)

      await editPatient(patient)

      const patientIndex = patients.findIndex(({ id }) => id === patient.id)
      const newPatients = [...patients]
      newPatients[patientIndex] = patient
      setPatients(newPatients)
    } finally {
      onSaving(false)
    }
  }

  const onDeletePatient = async (patientId) => {
    try {
      onSaving(true)
      await deletePatient(patientId)

      const patientIndex = patients.findIndex(({ id }) => id === patientId)
      const newPatients = [...patients]
      newPatients.splice(patientIndex, 1)
      setPatients(newPatients)
    } finally {
      onSaving(false)
    }
  }

  return (
    <Page breadcrumbs={<Breadcrumbs current="Pacientes" />}>
      <Table
        data={filteredPatients}
        isLoading={loading}
        onCreate={onCreatePatient}
        onDelete={onDeletePatient}
        onEdit={onEditPatient}
        searchValue={search}
        onSearchChange={(value) => setSearch(value)}
      />
    </Page>
  )
}

export default PatientsPage
