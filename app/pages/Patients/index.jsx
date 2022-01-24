import React, { useState } from 'react'
import useAsyncEffect from 'use-async-effect'
import { Grid, Stack, Button } from '@mui/material'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import CloudDownloadIcon from '@mui/icons-material/CloudDownload'

import { fetchAllPatients, createPatient } from 'api/database'
import SearchField from 'components/SearchField'
import { homeURL } from 'configs/urls'
import DashPage from 'components/DashPage'
import CreateModal from './CreateModal'
import Table from './Table'

const PatientsPage = () => {
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

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
    <>
      <DashPage title="Pacientes" backURL={homeURL()}>
        <Stack spacing={4}>
          <Grid
            container
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item xs>
              <SearchField placeholder="Buscar por nome, celular ou CPF" />
            </Grid>
            <Grid item>
              <Button variant="outlined" startIcon={<CloudDownloadIcon />}>
                Exportar
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                startIcon={<PersonAddIcon />}
                onClick={handleOpen}
              >
                Criar Paciente
              </Button>
            </Grid>
          </Grid>
          <Table data={patients} isLoading={loading} />
        </Stack>
      </DashPage>
      <CreateModal
        open={open}
        handleClose={handleClose}
        onSubmit={onCreatePatient}
      />
    </>
  )
}

export default PatientsPage
