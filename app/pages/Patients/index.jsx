import React, { useState } from 'react'
import useAsyncEffect from 'use-async-effect'

import {
  fetchAllPatients,
  createPatient,
  editPatient,
  deletePatient,
} from 'api/database'
import { homeURL } from 'configs/urls'
import DashPage from 'components/DashPage'
import Table from './Table'

const PatientsPage = () => {
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(true)

  useAsyncEffect(async (isActive) => {
    const allPatients = await fetchAllPatients()
    if (!isActive()) {
      return
    }

    setPatients(allPatients)
    setLoading(false)
  }, [])

  const onCreatePatient = async (patient) => {
    try {
      setLoading(true)
      await createPatient(patient)

      const newPatients = [...patients, patient]
      setPatients(newPatients)
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
    } finally {
      setLoading(false)
    }
  }

  const onDeletePatient = async (patientId) => {
    try {
      setLoading(true)
      await deletePatient(patientId)

      const patientIndex = patients.findIndex(({ id }) => id === patientId)
      const newPatients = [...patients]
      newPatients.splice(patientIndex, 1)
      setPatients(newPatients)
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashPage title="Pacientes" backURL={homeURL()}>
      <Table
        data={patients}
        isLoading={loading}
        onCreate={onCreatePatient}
        onDelete={onDeletePatient}
        onEdit={onEditPatient}
      />
    </DashPage>
  )
}

export default PatientsPage
