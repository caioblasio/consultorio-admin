import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import useAsyncEffect from 'use-async-effect'
import { Grid } from '@mui/material'
import { fetchPatientById, editPatient } from 'api/database'
import Breadcrumbs from 'containers/Breadcrumbs'
import Page from 'containers/Page'
import { SaveContext } from 'contexts/Save'

import ScheduleCard from './ScheduleCard'
import PatientCard from './PatientCard'
import PaymentsCard from './PaymentsCard'

const PatientPage = () => {
  const [patient, setPatient] = useState()
  const [loading, setLoading] = useState(true)
  const { onSaving } = useContext(SaveContext)

  const { patientId } = useParams()

  useAsyncEffect(async (isMounted) => {
    const patient = await fetchPatientById(patientId)
    setLoading(true)
    if (!isMounted()) {
      return
    }

    setPatient(patient)
    setLoading(false)
  }, [])

  const onEditPatient = async (patient) => {
    await onSaving(() => editPatient(patient))
    setPatient(patient)
  }

  return (
    <Page
      breadcrumbs={<Breadcrumbs current={patient?.name} isLoading={loading} />}
    >
      <Grid container spacing={4}>
        <Grid item xs={4}>
          <PatientCard
            patient={patient}
            isLoading={loading}
            onEdit={onEditPatient}
          />
        </Grid>
        <Grid item xs={4}>
          <ScheduleCard patient={patient} isLoading={loading} />
        </Grid>
        <Grid item xs={4}>
          <PaymentsCard patient={patient} isLoading={loading} />
        </Grid>
      </Grid>
    </Page>
  )
}

export default PatientPage
