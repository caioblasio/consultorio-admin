import React from 'react'
import { Grid, Button } from '@mui/material'
import FaceIcon from '@mui/icons-material/Face'
import LogoutIcon from '@mui/icons-material/Logout'
import PeopleIcon from '@mui/icons-material/People'
import HomeIcon from '@mui/icons-material/Home'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'

import { signOut } from 'api/authentication'
import LogoTitle from 'components/LogoTitle'
import Logo from 'assets/svg/logo.svg'
import { StyledAppBar, StyledDivider, StyledToolbar } from './styles'

const Header = () => {
  return (
    <StyledAppBar elevation={0} color="background">
      <StyledToolbar>
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <img src={Logo} />
              </Grid>
              <Grid item>
                <LogoTitle />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container>
              <Grid item>
                <Button startIcon={<HomeIcon />}>Inicio</Button>
              </Grid>
              <Grid item>
                <Button startIcon={<PeopleIcon />}>Pacientes</Button>
              </Grid>
              <Grid item>
                <Button startIcon={<CalendarTodayIcon />}>Agendamentos</Button>
              </Grid>
              <Grid item>
                <Button startIcon={<AttachMoneyIcon />}>Pagamentos</Button>
              </Grid>
              <Grid item>
                <Button startIcon={<FaceIcon />}>Minha Conta</Button>
              </Grid>
              <Grid item>
                <Button onClick={signOut} startIcon={<LogoutIcon />}>
                  Sair
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </StyledToolbar>
    </StyledAppBar>
  )
}

export default Header
