import { Container } from '@mui/material'
import { styled } from '@mui/system'

export const StyledMain = styled(Container)(({ theme }) => ({
  marginTop: 96, // Height of header,
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
  height: '100%',
}))
