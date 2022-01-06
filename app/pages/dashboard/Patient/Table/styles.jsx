import { styled } from '@mui/system'

const StatusDot = styled('span')(({ theme }) => ({
  height: 15,
  width: 15,
  borderRadius: '50%',
  display: 'inline-block',
}))

export const ActiveDot = styled(StatusDot)(({ theme }) => ({
  backgroundColor: theme.palette.success.main,
}))

export const InactiveDot = styled(StatusDot)(({ theme }) => ({
  backgroundColor: theme.palette.error.main,
}))
