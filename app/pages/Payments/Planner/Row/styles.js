import { styled } from '@mui/material/styles'
import PlannerRow from 'components/Planner/Row'

export const StyledRow = styled(PlannerRow, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})(({ isActive }) => ({
  opacity: isActive ? undefined : 0.45,
}))
