import React, { useState } from 'react'
import useAsyncEffect from 'use-async-effect'
import {
  fetchAllPatients,
  createPatient,
  editPatient,
  deletePatient,
} from 'api/database'
import DashPage from 'components/DashPage'
import Snackbar from 'components/Snackbar'
import { unformatCPF } from 'utils/cpf'
import Table from './Table'

const PatientsPage = () => {
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [alert, setAlert] = useState({ progress: false })

  useAsyncEffect(async (isMounted) => {
    const allPatients = await fetchAllPatients()
    if (!isMounted()) {
      return
    }

    setPatients(allPatients)
    setLoading(false)
  }, [])

  const handleClose = () => {
    setAlert({ ...alert, progress: false })
  }

  const filteredPatients = patients.filter(
    ({ name, phone, cpf }) =>
      name.toLowerCase().includes(search.toLowerCase()) ||
      phone.some((number) => number.includes(search)) ||
      unformatCPF(cpf).includes(search)
  )

  const onCreatePatient = async (patient) => {
    try {
      setLoading(true)
      const createdPatient = await createPatient(patient)
      const newPatients = [...patients, createdPatient]
      setPatients(newPatients)
      setAlert({
        title: 'Sucesso!',
        message: (
          <>
            Paciente <strong>{createdPatient.name}</strong> criado com sucesso.
          </>
        ),
        severity: 'success',
        progress: true,
      })
    } finally {
      setLoading(false)
    }
  }

  const onEditPatient = async (patient) => {
    try {
      setLoading(true)

      await editPatient(patient)

      const patientIndex = patients.findIndex(({ id }) => id === patient.id)
      const newPatients = [...patients]
      newPatients[patientIndex] = patient
      setPatients(newPatients)
      setAlert({
        title: 'Sucesso!',
        message: (
          <>
            Paciente <strong>{patient.name}</strong> editado com sucesso.
          </>
        ),
        severity: 'success',
        progress: true,
      })
    } finally {
      setLoading(false)
    }
  }

  const onDeletePatient = async (patientId) => {
    try {
      setLoading(true)
      await deletePatient(patientId)

      const patientIndex = patients.findIndex(({ id }) => id === patientId)
      const patient = patients[patientIndex]
      const newPatients = [...patients]
      newPatients.splice(patientIndex, 1)
      setPatients(newPatients)
      setAlert({
        title: 'Sucesso!',
        message: (
          <>
            Paciente <strong>{patient.name}</strong> removido com sucesso.
          </>
        ),

        severity: 'success',
        progress: true,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashPage title="Pacientes">
      <Table
        data={filteredPatients}
        isLoading={loading}
        onCreate={onCreatePatient}
        onDelete={onDeletePatient}
        onEdit={onEditPatient}
        searchValue={search}
        onSearchChange={(value) => setSearch(value)}
      />
      <Snackbar
        title={alert.title}
        open={alert.progress}
        onClose={handleClose}
        severity={alert.severity}
      >
        {alert.message}
      </Snackbar>
    </DashPage>
  )
}

export default PatientsPage
