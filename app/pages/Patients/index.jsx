import React, { useContext, useState, useMemo } from 'react'
import useAsyncEffect from 'use-async-effect'
import {
  fetchAllPatients,
  createPatient,
  editPatient,
  deletePatient,
  fetchAllActiveHolders,
} from 'api/database'
import Breadcrumbs from 'containers/Breadcrumbs'
import { SaveContext } from 'contexts/Save'
import Page from 'containers/Page'
import Table from './Table'

const PatientsPage = () => {
  const { saving, onSaving } = useContext(SaveContext)
  const [patients, setPatients] = useState([])
  const [holders, setHolders] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [showAll, setShowAll] = useState(false)

  useAsyncEffect(async (isMounted) => {
    const allPatients = await fetchAllPatients()
    const allHolders = await fetchAllActiveHolders()
    if (!isMounted()) {
      return
    }

    setHolders(allHolders)
    setPatients(allPatients)
    setLoading(false)
  }, [])

  const filteredPatients = useMemo(
    () =>
      patients.filter(
        ({ name, phone, isActive }) =>
          (showAll || isActive) &&
          (name.toLowerCase().includes(search.toLowerCase()) ||
            phone.some((number) => number.includes(search)))
      ),
    [patients, showAll, search]
  )

  const allHolders = useMemo(
    () =>
      holders.map(({ id, name, cpf }) => ({
        id,
        label: name,
        cpf,
      })),
    [holders]
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

  const onDeletePatient = async (patient) => {
    const newPatient = { ...patient, isActive: false }
    await onSaving(() => editPatient(newPatient))
    const patientIndex = patients.findIndex(({ id }) => id === newPatient.id)
    const newPatients = [...patients]
    newPatients[patientIndex] = newPatient
    setPatients(newPatients)
  }

  return (
    <Page breadcrumbs={<Breadcrumbs current="Pacientes" />}>
      <Table
        data={filteredPatients}
        holders={allHolders}
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
