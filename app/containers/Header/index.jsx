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
  Payments,
  PaymentsOutlined,
} from '@mui/icons-material'

import {
  homeURL,
  patientsURL,
  loginURL,
  paymentsURL,
  accountURL,
  schedulesURL,
  holdersURL,
} from 'configs/urls'
import { signOut } from 'api/authentication'
import LogoTitle from 'components/LogoTitle'
import Logo from 'assets/svg/logo.svg'
import HeaderNavLink from './NavLink'
import HeaderNavDropdown from './NavDropdown'
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
                <HeaderNavLink
                  inactiveIcon={<HomeOutlined />}
                  activeIcon={<Home />}
                  to={homeURL()}
                >
                  Inicio
                </HeaderNavLink>
              </Grid>
              <Grid item>
                <HeaderNavDropdown
                  inactiveIcon={<PeopleOutlined />}
                  activeIcon={<People />}
                  text="Pessoas"
                  options={[
                    { to: patientsURL(), text: 'Pacientes' },
                    { to: holdersURL(), text: 'Responsáveis' },
                  ]}
                >
                  Pessoas
                </HeaderNavDropdown>
              </Grid>

              <Grid item>
                <HeaderNavLink
                  inactiveIcon={<PaymentsOutlined />}
                  activeIcon={<Payments />}
                  to={paymentsURL()}
                >
                  Pagamentos
                </HeaderNavLink>
              </Grid>
              <Grid item>
                <HeaderNavLink
                  inactiveIcon={<CalendarTodayOutlined />}
                  activeIcon={<CalendarToday />}
                  to={schedulesURL()}
                >
                  Agendamentos
                </HeaderNavLink>
              </Grid>
              <Grid item>
                <HeaderNavLink
                  inactiveIcon={<FaceOutlined />}
                  activeIcon={<Face />}
                  to={accountURL()}
                >
                  Minha Conta
                </HeaderNavLink>
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
