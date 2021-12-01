import { styled } from '@mui/system'
import BackgroundMask from 'assets/svg/background-mask.svg'

const AuthenticationContainer = styled('div')(({ theme }) => ({
  minHeight: '100vh',
  backgroundColor: theme.palette.primary.dark,
  backgroundImage: `url(${BackgroundMask})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
}))

export default AuthenticationContainer
