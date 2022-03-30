import { Box, alpha } from '@mui/material'
import { styled } from '@mui/system'

export const StyledBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'color' && prop !== 'disableClick',
})(({ theme, color, disableClick }) => ({
  position: 'relative',
  padding: theme.spacing(1, 2),
  height: '100%',
  transition: theme.transitions.create(['background-color', 'box-shadow']),
  borderLeft: color ? `4px solid ${theme.palette[color].main}` : '',
  backgroundColor: color ? alpha(theme.palette[color].light, 0.5) : '',
  ...(!disableClick && {
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: color
        ? theme.palette[color].light
        : alpha(theme.palette.grey.light, 0.5),
      boxShadow: color ? theme.shadows[1] : '',
    },
  }),
}))
