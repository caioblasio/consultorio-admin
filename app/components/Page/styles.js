import { Grid, Typography, SvgIcon } from '@mui/material'
import { SyncOutlined } from '@mui/icons-material'
import { styled } from '@mui/system'

export const StyledGrid = styled(Grid)({
  height: '100%',
})

export const StyledSyncOutlined = styled(SyncOutlined)({
  animation: 'spin 1.2s ease infinite',
  '@keyframes spin': {
    '0%': {
      transform: 'rotate(360deg)',
    },
    '100%': {
      transform: 'rotate(0deg)',
    },
  },
})

export const StyledIcon = styled(SvgIcon)(({ theme }) => ({
  color: theme.palette.grey.dark,
  verticalAlign: 'bottom',
  marginRight: theme.spacing(1),
}))

export const StyledText = styled(Typography)({
  textDecoration: 'underline',
})
