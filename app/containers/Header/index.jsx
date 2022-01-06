import React, { useContext } from 'react'
import { AuthContext } from 'contexts/Auth'
import {
  AppBar,
  Toolbar,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Box,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { signOut } from 'api/authentication'
import {
  StyledSearch,
  StyledSearchIconWrapper,
  StyledInputBase,
  StyledDivider,
} from './styles'
import SearchBar from 'components/SearchBar'

const Header = () => {
  const { currentUser } = useContext(AuthContext)

  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const onSignOut = () => {
    handleClose()
    signOut()
  }

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}></Box>
        <Box>
          <SearchBar hasExpansion />
        </Box>
        <Box ml={4}>
          <IconButton onClick={handleMenu} sx={{ p: 0 }}>
            <Avatar alt="Remy Sharp" src={currentUser.photoURL} />
          </IconButton>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={onSignOut}>
              <Typography textAlign="center">Sair</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
      <StyledDivider variant="middle" />
    </AppBar>
  )
}

export default Header
