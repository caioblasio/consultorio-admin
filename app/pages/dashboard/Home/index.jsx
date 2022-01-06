import React, { useContext, useState, useEffect } from 'react'
import { Grid } from '@mui/material'
import { AuthContext } from 'contexts/Auth'
import Dashboard from 'pages/dashboard'
import SummaryCard from 'containers/SummaryCard'
import PatientsCard from 'containers/DataCard/PatientsCard'
import PaymentsCard from 'containers/DataCard/PaymentsCard'

const Home = () => {
  const { currentUser } = useContext(AuthContext)
  const title = `Bem-vindo ${currentUser.displayName},`

  return (
    <Dashboard title={title}>
      <Grid container spacing={2}>
        <Grid item container spacing={2} xs={8} justifyContent="center">
          <Grid item xs={6}>
            <PaymentsCard />
          </Grid>
          <Grid item xs={6}>
            <PatientsCard />
          </Grid>
        </Grid>
        <Grid item xs={4} justifyContent="center">
          <SummaryCard />
        </Grid>
      </Grid>
    </Dashboard>
  )
}

export default Home
