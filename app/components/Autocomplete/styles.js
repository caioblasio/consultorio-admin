import { Autocomplete, Typography } from '@mui/material'
import { styled } from '@mui/system'

export const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  '& .MuiInputBase-root.MuiOutlinedInput-root': {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}))

export const StyledHighlightedText = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'isHighlighted',
})(({ theme, isHighlighted }) => ({
  color: isHighlighted ? theme.palette.primary.main : undefined,
}))
