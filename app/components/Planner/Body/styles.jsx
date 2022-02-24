import { Grid } from '@mui/material'
import { styled } from '@mui/system'

export const StyledHeaderGridItem = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
}))

export const StyledBodyGridItem = styled(Grid, {
  shouldForwardProp: (prop) =>
    prop !== 'isRight' && prop !== 'isBottom' && prop !== 'isLeft',
})(({ theme, isBottom, isRight, isLeft }) => ({
  borderLeft: isLeft ? `1px solid ${theme.palette.grey.main}` : '',
  borderRight: !isRight ? `1px solid ${theme.palette.grey.main}` : '',
  borderBottom: !isBottom ? `1px solid ${theme.palette.grey.main}` : '',
}))
