import React, { useContext, useState, useMemo } from 'react'
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
  const { saving, onSaving } = useContext(SaveContext)
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [showAll, setShowAll] = useState(false)

  useAsyncEffect(async (isMounted) => {
    const allPatients = await fetchAllPatients()
    if (!isMounted()) {
      return
    }

    setPatients(allPatients)
    setLoading(false)
  }, [])

  const filteredPatients = useMemo(
    () =>
      patients.filter(
        ({ name, phone, cpf, isActive }) =>
          (showAll || isActive) &&
          (name.toLowerCase().includes(search.toLowerCase()) ||
            phone.some((number) => number.includes(search)) ||
            unformatCPF(cpf).includes(search))
      ),
    [patients, showAll, search]
  )

  const onCreatePatient = async (patient) => {
    const createdPatientId = await onSaving(() => createPatient(patient))
    const newPatients = [...patients, { ...patient, id: createdPatientId }]
    setPatients(newPatients)
  }

  const onEditPatient = async (patient) => {
    await onSaving(() => editPatient(patient))
    const patientIndex = patients.findIndex(({ id }) => id === patient.id)
    const newPatients = [...patients]
    newPatients[patientIndex] = patient
    setPatients(newPatients)
  }

  const onDeletePatient = async (patientId) => {
    await onSaving(() => deletePatient(patientId))
    const patientIndex = patients.findIndex(({ id }) => id === patientId)
    const newPatients = [...patients]
    newPatients.splice(patientIndex, 1)
    setPatients(newPatients)
  }

  return (
    <Page breadcrumbs={<Breadcrumbs current="Pacientes" />}>
      <Table
        data={filteredPatients}
        isLoading={loading || saving}
        onCreate={onCreatePatient}
        onDelete={onDeletePatient}
        onEdit={onEditPatient}
        searchValue={search}
        showAllValue={showAll}
        onShowAllChange={(value) => setShowAll(value)}
        onSearchChange={(_, value) => setSearch(value)}
      />
    </Page>
  )
}

export default PatientsPage
