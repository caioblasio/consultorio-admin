import { Grid, Paper } from '@mui/material'
import { styled } from '@mui/system'

import NoData from 'components/NoData'
import Loader from 'components/Loader'

export const StyledPaper = styled(Paper)(({ theme }) => ({
  position: 'relative',
  minHeight: theme.spacing(12),
}))

export const StyledLoader = styled(Loader)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
})

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

export const StyledNoData = styled(NoData)(({ theme }) => ({
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  marginTop: theme.spacing(2),
}))
