import { Switch } from '@mui/material'
import { styled } from '@mui/system'

export const StyledSwitch = styled(Switch)(({ theme }) => ({
  padding: 7,

  '& .MuiSwitch-switchBase': {
    padding: 9,

    '& .MuiSwitch-thumb': {
      color: theme.palette.common.white,
    },

    '&.Mui-checked+.MuiSwitch-track': {
      opacity: 1,
    },
  },

  '& .MuiSwitch-track': {
    borderRadius: 15,
    backgroundColor: theme.palette.grey.dark,
  },
}))
