import { styled } from '@mui/system'
import Page from 'components/Page'

export const StyledAuthBox = styled('div')({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  textAlign: 'center',
})

export const StyledBackground = styled('div')(({ theme }) => ({
  '&::before': {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    background: `linear-gradient(120deg, ${theme.palette.primary.main} 25%, ${theme.palette.primary.dark} 75%);`,
    content: '""',
  },
}))
