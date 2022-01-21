import React, { useContext } from 'react'
import { Grid } from '@mui/material'
import { AuthContext } from 'contexts/Auth'
import DashPage from 'components/DashPage'
import PatientsCard from 'containers/PatientsCard'
import PaymentsCard from 'containers/PaymentsCard'

import { StyledGrid, StyledSummaryCard } from './styles'

const HomePage = () => {
  const { currentUser } = useContext(AuthContext)
  const title = `Bem-vindo ${currentUser.displayName},`

  return (
    <DashPage title={title}>
      <StyledGrid container spacing={2} alignItems="stretch">
        <Grid item xs={8}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <PaymentsCard />
            </Grid>
            <Grid item xs={6}>
              <PatientsCard />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <StyledSummaryCard />
        </Grid>
      </StyledGrid>
    </DashPage>
  )
}

export default HomePage
