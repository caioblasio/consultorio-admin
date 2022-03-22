import { Grid, Paper } from '@mui/material'
import { styled } from '@mui/system'

import NoData from 'components/NoData'

export const StyledPaper = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'isEmpty',
})(({ theme, isEmpty }) => ({
  position: 'relative',
  minHeight: isEmpty ? theme.spacing(16) : undefined,
}))

export const StyledHeaderGridItem = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'right',
}))

export const StyledBodyGridItem = styled(Grid, {
  shouldForwardProp: (prop) =>
    prop !== 'isRight' && prop !== 'isBottom' && prop !== 'isLeft',
})(({ theme, isBottom, isRight, isLeft }) => ({
  borderLeft: isLeft ? `1px solid ${theme.palette.grey.main}` : '',
  borderRight: !isRight ? `1px solid ${theme.palette.grey.main}` : '',
  borderBottom: !isBottom ? `1px solid ${theme.palette.grey.main}` : '',
}))

export const StyledNoData = styled(NoData)({
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
})
