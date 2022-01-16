import React, { useEffect, useState } from 'react'
import { Grid, Stack, Button } from '@mui/material'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { fetchAllPatients } from 'api/database'
import SearchBar from 'components/SearchBar'
import { homeURL } from 'configs/urls'
import PatientsTable from './Table'
import Dashboard from 'pages/dashboard'

const Patients = () => {
  const [patients, setPatients] = useState([])

  useEffect(async () => {
    const data = await fetchAllPatients()
    setPatients(data)
  }, [])

  return (
    <Dashboard title="Pacientes" backURL={homeURL()}>
      <Stack spacing={2}>
        <Grid container justifyContent="space-between">
          <Grid item>
            <SearchBar />
          </Grid>
          <Grid item>
            <Button variant="contained" startIcon={<PersonAddIcon />}>
              Criar Paciente
            </Button>
          </Grid>
        </Grid>
        <PatientsTable patients={patients} />
      </Stack>
    </Dashboard>
  )
}

export default Patients
