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
  // const [open, setOpen] = useState(false)
  // const [patientToEdit, setPatientToEdit] = useState(null)
  // const handleOpen = () => setOpen(true)
  // const handleClose = () => {
  //   if (patientToEdit) {
  //     setPatientToEdit(null)
  //   }
  //   setOpen(false)
  // }

  useAsyncEffect(async (isActive) => {
    const allPatients = await fetchAllPatients()
    if (!isActive()) return
    setPatients(allPatients)
    setLoading(false)
  }, [])

  const onCreatePatient = async (data) => {
    // setOpen(false)
    // setLoading(true)
    // patientToEdit
    //   ? await editPatient(patientToEdit.id, data)
    //   : await createPatient(data)
    // const allPatients = await fetchAllPatients()
    // setPatients(allPatients)
    // setPatientToEdit(null)
    // setLoading(false)

    console.log(data)
    setLoading(true)
    await createPatient(data)
    const allPatients = await fetchAllPatients()
    setPatients(allPatients)
    setLoading(false)
  }

  const onEditPatient = (patient) => {
    setPatientToEdit(patient)
    handleOpen()
  }

  const onDeletePatient = async (id) => {
    const p = await deletePatient(id)
    console.log(p)
  }

  return (
    <DashPage title="Pacientes" backURL={homeURL()}>
      <Table data={patients} isLoading={loading} onCreate={onCreatePatient} />
    </DashPage>
  )
}

export default PatientsPage
