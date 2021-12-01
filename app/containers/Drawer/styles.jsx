import { styled } from '@mui/system'
import { Drawer } from '@mui/material'

export const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: 88,
    backgroundColor: theme.palette.grey['200'],
    border: 'none',
  },
}))
