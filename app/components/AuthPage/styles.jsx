import { styled } from '@mui/system'
import Page from 'components/Page'

export const StyledAuthBox = styled('div')({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  textAlign: 'center',
})

export const StyledBackground = styled('div')({
  '&::before': {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    background: 'linear-gradient(116.94deg, #7BB0FF -5.72%, #9EE497 101.06%)',
    content: '""',
  },
})
