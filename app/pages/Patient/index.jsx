import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import useAsyncEffect from 'use-async-effect'
import { Grid } from '@mui/material'
import { fetchPatientById } from 'api/database'
import DashPage from 'components/DashPage'
import DataCard from './DataCard'
import PaymentsCard from './PaymentsCard'

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

  return (
    <DashPage breadcrumb={patient.name}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <DataCard patient={patient} />
        </Grid>
        <Grid item xs={6}>
          <PaymentsCard patient={patient} />
        </Grid>
      </Grid>
    </DashPage>
  )
}

export default PatientPage
