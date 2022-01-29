import React, { useState } from 'react'
import useAsyncEffect from 'use-async-effect'

import { fetchAllPatients, createPatient } from 'api/database'
import { homeURL } from 'configs/urls'
import DashPage from 'components/DashPage'
import Table from './Table'

const PatientsPage = () => {
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(true)

  useAsyncEffect(async (isActive) => {
    const data = await fetchAllPatients()
    if (!isActive()) return
    setPatients(data)
    setLoading(false)
  }, [])

  const onCreatePatient = async (data) => {
    handleClose()
    const patient = await createPatient(data)
    setPatients([...patients, patient])
  }

  return (
    <DashPage title="Pacientes" backURL={homeURL()}>
      <Table data={patients} isLoading={loading} onCreate={onCreatePatient} />
    </DashPage>
  )
}

export default PatientsPage
