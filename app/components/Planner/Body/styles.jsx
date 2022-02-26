import { Grid, Paper } from '@mui/material'
import { styled } from '@mui/system'

import Loader from 'components/Loader'

export const StyledPaper = styled(Paper)(({ theme }) => ({
  position: 'relative',
  minHeight: theme.spacing(9),
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
