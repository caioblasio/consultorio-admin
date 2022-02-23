import { Grid, IconButton, Typography } from '@mui/material'
import { styled } from '@mui/system'

export const StyledYear = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(0, 8),
}))

export const StyledHeaderMonthsGrid = styled(Grid)(({ theme }) => ({
  position: 'relative',
}))

export const StyledPreviousMonthButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  left: 0,
  top: '50%',
  transform: 'translateY(-50%)',
  marginTop: theme.spacing(1),
}))

export const StyledNextMonthButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  right: 0,
  top: '50%',
  transform: 'translateY(-50%)',
  marginTop: theme.spacing(1),
}))

const StyledGridItem = styled(Grid)(({ theme }) => ({}))

export const StyledHeaderGridItem = styled(StyledGridItem)(({ theme }) => ({
  padding: theme.spacing(2),
}))

export const StyledBodyGridItem = styled(StyledGridItem, {
  shouldForwardProp: (prop) =>
    prop !== 'isRight' && prop !== 'isBottom' && prop !== 'isLeft',
})(({ theme, isBottom, isRight, isLeft }) => ({
  borderLeft: isLeft ? `1px solid ${theme.palette.grey.main}` : '',
  borderRight: !isRight ? `1px solid ${theme.palette.grey.main}` : '',
  borderBottom: !isBottom ? `1px solid ${theme.palette.grey.main}` : '',
}))
