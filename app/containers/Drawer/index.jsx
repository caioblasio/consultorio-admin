import * as React from 'react'
import { Box, List, ListItem, ListItemButton, SvgIcon } from '@mui/material'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import PersonIcon from '@mui/icons-material/Person'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import { StyledDrawer, StyledDrawerHeader } from './styles'
import LogoWithoutText from 'assets/svg/logo-without-text.svg'

const Drawer = () => {
  return (
    <StyledDrawer variant="permanent" open={true}>
      <List>
        <Box mb={4}>
          <ListItemButton disableTouchRipple>
            <img src={LogoWithoutText} />
          </ListItemButton>
        </Box>
        <Box mb={2}>
          <ListItemButton disableTouchRipple>
            <PersonIcon color="action" fontSize="large" />
          </ListItemButton>
        </Box>
        <Box mb={2}>
          <ListItemButton disableTouchRipple>
            <CreditCardIcon color="action" fontSize="large" />
          </ListItemButton>
        </Box>
      </List>
    </StyledDrawer>
  )
}

export default Drawer
