import React, { useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import useAsyncEffect from 'use-async-effect'
import { fetchPatientById } from 'api/database'
import DashPage from 'components/DashPage'

const PatientPage = () => {
  const [patient, setPatient] = useState(null)
  const [loading, setLoading] = useState(true)

  const { patientId } = useParams()

  useAsyncEffect(async (isActive) => {
    const patient = await fetchPatientById(patientId)
    if (!isActive()) {
      return
    }

    setPatient(patient)
    setLoading(false)
  }, [])

  if (!patient) {
    return null
  }

  return <DashPage breadcrumb={patient.name}></DashPage>
}

export default PatientPage
