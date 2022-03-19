import { styled } from '@mui/system'
import { ErrorOutlineOutlined } from '@mui/icons-material'
import { MenuItem } from '@mui/material'

export const StyledError = styled(ErrorOutlineOutlined)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
})

export const StyledErrorItem = styled(MenuItem)(({ theme }) => ({
  color: theme.palette.error.main,
  '&:hover': {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.error.main,
  },
}))
