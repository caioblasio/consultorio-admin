import React, { useEffect, useState } from 'react'
import { Grid, Stack, Button } from '@mui/material'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { fetchAllPatients } from 'api/database'
import Dashboard from 'pages/dashboard'
import SearchBar from 'components/SearchBar'
import PatientsTable from './Table'

const Patient = () => {
  const [patients, setPatients] = useState([])

  useEffect(async () => {
    const data = await fetchAllPatients()
    setPatients(data)
  }, [])

  return (
    <Dashboard title="Pacientes">
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

export default Patient
