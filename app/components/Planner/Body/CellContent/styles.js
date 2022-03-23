import { styled } from '@mui/system'
import { MenuItem } from '@mui/material'

export const StyledErrorItem = styled(MenuItem)(({ theme }) => ({
  color: theme.palette.error.main,
  '&:hover': {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.error.main,
  },
}))
