import React, { useEffect, useState } from 'react'
import useAsyncEffect from 'use-async-effect'
import { Grid, Stack, Button } from '@mui/material'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { fetchAllPatients } from 'api/database'
import SearchBar from 'components/SearchBar'
import { homeURL } from 'configs/urls'
import PatientsTable from './Table'
import Dashboard from 'pages/dashboard'
import CreatePatientModal from './CreatePatientModal'

const Patients = () => {
  const [patients, setPatients] = useState([])
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  useAsyncEffect(async (isActive) => {
    const data = await fetchAllPatients()
    if (!isActive()) return
    setPatients(data)
  }, [])

  return (
    <>
      <Dashboard title="Pacientes" backURL={homeURL()}>
        <Stack spacing={2}>
          <Grid container justifyContent="space-between">
            <Grid item>
              <SearchBar />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                startIcon={<PersonAddIcon />}
                onClick={handleOpen}
              >
                Criar Paciente
              </Button>
            </Grid>
          </Grid>
          <PatientsTable patients={patients} />
        </Stack>
      </Dashboard>
      <CreatePatientModal open={open} handleClose={handleClose} />
    </>
  )
}

export default Patients
