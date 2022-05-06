import { styled } from '@mui/system'
import { List } from '@mui/material'

export const StyledList = styled(List, {
  shouldForwardProp: (prop) => prop !== 'visible',
})(({ visible }) => ({
  position: 'absolute',
  display: visible ? undefined : 'none',
}))
