import * as React from 'react'
import { useHistory } from 'react-router-dom'
import { Box } from '@mui/material'
import { patientsURL, homeURL } from 'configs/urls'
import Logo from 'assets/svg/logo.svg'
import {
  StyledDrawer,
  StyledDrawerButton,
  StyledList,
  StyledPersonIcon,
} from './styles'

const Drawer = () => {
  const history = useHistory()
  return (
    <StyledDrawer variant="permanent" open>
      <StyledList>
        <Box mb={4}>
          <StyledDrawerButton onClick={() => history.push(homeURL())}>
            <img src={Logo} />
          </StyledDrawerButton>
        </Box>
        <Box mb={2}>
          <StyledDrawerButton onClick={() => history.push(patientsURL())}>
            <StyledPersonIcon color="action" fontSize="large" />
          </StyledDrawerButton>
        </Box>
      </StyledList>
    </StyledDrawer>
  )
}

export default Drawer
