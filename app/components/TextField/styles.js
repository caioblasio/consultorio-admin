import { TextField } from '@mui/material'
import { styled } from '@mui/system'

export const StyledTextField = styled(TextField)(({ theme }) => ({
  '&.MuiTextField-root-adornedStart': {
    '& .MuiInputLabel-root:not(.MuiFormLabel-filled):not(.Mui-focused)': {
      transform: `translate(${theme.spacing(6)}, ${theme.spacing(1)}) scale(1)`,
    },
  },

  '& .MuiInputLabel-root:not(.MuiFormLabel-filled):not(.Mui-focused)': {
    transform: `translate(${theme.spacing(2)}, ${theme.spacing(1)}) scale(1)`,
  },

  '& .MuiInputBase-root.Mui-focused': {
    '& .MuiInputAdornment-root': {
      color: theme.palette.primary.main,
    },
  },
}))
