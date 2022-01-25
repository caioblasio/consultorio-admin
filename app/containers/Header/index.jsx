import React from 'react'
import { Grid } from '@mui/material'
import FaceIcon from '@mui/icons-material/Face'
import LogoutIcon from '@mui/icons-material/Logout'
import PeopleIcon from '@mui/icons-material/People'
import HomeIcon from '@mui/icons-material/Home'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'

import { homeURL, patientsURL } from 'configs/urls'
import { signOut } from 'api/authentication'
import NavLink from 'containers/NavLink'
import LogoTitle from 'components/LogoTitle'
import Logo from 'assets/svg/logo.svg'
import { StyledAppBar, StyledToolbar } from './styles'

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
            <Grid container spacing={4}>
              <Grid item>
                <NavLink icon={<HomeIcon />} to={homeURL()}>
                  Inicio
                </NavLink>
              </Grid>
              <Grid item>
                <NavLink icon={<PeopleIcon />} to={patientsURL()}>
                  Pacientes
                </NavLink>
              </Grid>
              <Grid item>
                <NavLink icon={<CalendarTodayIcon />}>Agendamentos</NavLink>
              </Grid>
              <Grid item>
                <NavLink icon={<AttachMoneyIcon />}>Pagamentos</NavLink>
              </Grid>
              <Grid item>
                <NavLink icon={<FaceIcon />}>Minha Conta</NavLink>
              </Grid>
              <Grid item>
                <NavLink onClick={signOut} icon={<LogoutIcon />}>
                  Sair
                </NavLink>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </StyledToolbar>
    </StyledAppBar>
  )
}

export default Header
