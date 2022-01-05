import { styled } from '@mui/system'
import { Drawer, List, ListItemButton } from '@mui/material'

export const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: theme.spacing(11),
    backgroundColor: theme.palette.grey.light,
    border: 'none',
  },
}))

export const StyledList = styled(List)(({ theme }) => ({
  padding: theme.spacing(2, 0),
}))

export const StyledDrawerButton = styled(ListItemButton)(({ theme }) => ({
  justifyContent: 'center',
  color: theme.palette.grey.dark,
  transition: theme.transitions.create('color'),

  '&:hover': {
    color: theme.palette.common.black,
    backgroundColor: 'transparent',
  },
}))
