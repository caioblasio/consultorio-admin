import { Container, Grid } from '@mui/material'
import { styled } from '@mui/system'

export const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
  height: '100%',
}))

export const StyledGrid = styled(Grid)({
  height: '100%',
})
