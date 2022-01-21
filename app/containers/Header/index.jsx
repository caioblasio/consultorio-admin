import React, { useContext } from 'react'
import { AuthContext } from 'contexts/Auth'
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Grid,
  Container,
} from '@mui/material'
import { signOut } from 'api/authentication'
import SearchBar from 'components/SearchBar'
import { StyledAppBar, StyledDivider, StyledToolbar } from './styles'

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
    <StyledAppBar elevation={0} color="background">
      <Container maxWidth="lg">
        <StyledToolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs />
            <Grid item>
              <SearchBar />
            </Grid>
            <Grid item>
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
            </Grid>
          </Grid>
          <StyledDivider variant="middle" />
        </StyledToolbar>
      </Container>
    </StyledAppBar>
  )
}

export default Header
