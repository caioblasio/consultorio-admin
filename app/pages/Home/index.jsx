import React, { useContext } from 'react'
import { Grid } from '@mui/material'
import { AuthContext } from 'contexts/Auth'
import Breadcrumbs from 'containers/Breadcrumbs'
import Page from 'containers/Page'
import PatientsCard from './PatientsCard'
import PaymentsCard from './PaymentsCard'
import SchedulesCard from './SchedulesCard'

import { StyledGrid, StyledSummaryCard } from './styles'

const HomePage = () => {
  const { currentUser } = useContext(AuthContext)
  const title = `Bem-vindo ${currentUser.email},`

  return (
    <Page breadcrumbs={<Breadcrumbs current={title} />} disableAutoSave>
      <StyledGrid container spacing={6} alignItems="stretch">
        <Grid item xs={8}>
          <StyledGrid container spacing={3} direction="column" wrap="nowrap">
            <Grid item xs={6}>
              <StyledGrid container spacing={3}>
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
    </Page>
  )
}

export default HomePage
