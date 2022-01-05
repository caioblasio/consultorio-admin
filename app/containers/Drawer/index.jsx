import * as React from 'react'
import { useHistory } from 'react-router-dom'
import { Box, ListItemButton } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import { patientsURL } from 'configs/urls'
import Logo from 'assets/svg/logo.svg'
import { StyledDrawer, StyledDrawerButton, StyledList } from './styles'

const Drawer = () => {
  const history = useHistory()
  return (
    <StyledDrawer variant="permanent" open={true}>
      <StyledList>
        <Box mb={4}>
          <StyledDrawerButton onClick={() => history.push(patientsURL())}>
            <img src={Logo} />
          </StyledDrawerButton>
        </Box>
        <Box mb={2}>
          <StyledDrawerButton onClick={() => history.push(patientsURL())}>
            <PersonIcon color="action" fontSize="large" />
          </StyledDrawerButton>
        </Box>
      </StyledList>
    </StyledDrawer>
  )
}

export default Drawer
