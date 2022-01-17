import { styled } from '@mui/system'
import { TextField } from '@mui/material'
import { alpha } from '@mui/material/styles'

export const StyledTextField = styled(TextField)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.grey['500'], 0.15),
  borderRadius: theme.shape.borderRadius * 4,
  fieldset: {
    border: 'none',
  },
}))
