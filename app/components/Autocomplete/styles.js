import { Autocomplete } from '@mui/material'
import { styled } from '@mui/system'

export const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  '& .MuiInputBase-root.MuiOutlinedInput-root': {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}))
