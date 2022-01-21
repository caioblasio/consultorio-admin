import React, { useContext } from 'react'
import { Grid } from '@mui/material'
import { AuthContext } from 'contexts/Auth'
import DashPage from 'components/DashPage'
import PatientsCard from './PatientsCard'
import PaymentsCard from './PaymentsCard'
import SchedulesCard from './SchedulesCard'

import { StyledGrid, StyledSummaryCard } from './styles'

const HomePage = () => {
  const { currentUser } = useContext(AuthContext)
  const title = `Bem-vindo ${currentUser.displayName},`

  return (
    <DashPage title={title}>
      <StyledGrid container spacing={6} alignItems="stretch">
        <Grid item xs={8}>
          <StyledGrid container spacing={2} direction="column" wrap="nowrap">
            <Grid item xs={6}>
              <StyledGrid container spacing={2}>
                <Grid item xs={6}>
                  <PaymentsCard />
                </Grid>
                <Grid item xs={6}>
                  <SchedulesCard />
                </Grid>
                <Grid item xs={6}>
                  <PatientsCard />
                </Grid>
              </StyledGrid>
            </Grid>
            <Grid item xs={6}></Grid>
          </StyledGrid>
        </Grid>
        <Grid item xs={4}>
          <StyledSummaryCard />
        </Grid>
      </StyledGrid>
    </DashPage>
  )
}

export default HomePage
