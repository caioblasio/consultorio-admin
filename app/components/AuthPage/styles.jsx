import { styled } from '@mui/system'

import BackgroundImage from 'assets/svg/background-mask.svg'

export const StyledBackground = styled('div')(({ theme }) => ({
  '&::before': {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.palette.primary.dark,
    backgroundImage: `url(${BackgroundImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    content: '""',
  },
}))

export const StyledAuthBox = styled('div')({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  textAlign: 'center',
})
