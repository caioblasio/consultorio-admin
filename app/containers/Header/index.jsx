import React from 'react'
import { Grid } from '@mui/material'
import {
  Home,
  HomeOutlined,
  People,
  PeopleOutlined,
  Logout,
  LogoutOutlined,
  Face,
  FaceOutlined,
  CalendarToday,
  CalendarTodayOutlined,
  ShoppingCart,
  ShoppingCartOutlined,
} from '@mui/icons-material'

import {
  homeURL,
  patientsURL,
  loginURL,
  paymentsURL,
  accountURL,
  schedulesURL,
} from 'configs/urls'
import { signOut } from 'api/authentication'
import LogoTitle from 'components/LogoTitle'
import Logo from 'assets/svg/logo.svg'
import NavLink from 'containers/NavLink'
import { StyledAppBar, StyledToolbar, StyledLogoutLink } from './styles'

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
                <NavLink
                  inactiveIcon={<HomeOutlined />}
                  activeIcon={<Home />}
                  to={homeURL()}
                >
                  Inicio
                </NavLink>
              </Grid>
              <Grid item>
                <NavLink
                  inactiveIcon={<PeopleOutlined />}
                  activeIcon={<People />}
                  to={patientsURL()}
                >
                  Pacientes
                </NavLink>
              </Grid>
              <Grid item>
                <NavLink
                  inactiveIcon={<CalendarTodayOutlined />}
                  activeIcon={<CalendarToday />}
                  to={schedulesURL()}
                >
                  Agendamentos
                </NavLink>
              </Grid>
              <Grid item>
                <NavLink
                  inactiveIcon={<ShoppingCartOutlined />}
                  activeIcon={<ShoppingCart />}
                  to={paymentsURL()}
                >
                  Pagamentos
                </NavLink>
              </Grid>
              <Grid item>
                <NavLink
                  inactiveIcon={<FaceOutlined />}
                  activeIcon={<Face />}
                  to={accountURL()}
                >
                  Minha Conta
                </NavLink>
              </Grid>
              <Grid item>
                <StyledLogoutLink
                  onClick={signOut}
                  inactiveIcon={<LogoutOutlined />}
                  activeIcon={<Logout />}
                  to={loginURL()}
                >
                  Sair
                </StyledLogoutLink>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </StyledToolbar>
    </StyledAppBar>
  )
}

export default Header
