import { styled } from '@mui/system'
import { Card } from '@mui/material'
import { svgIconClasses } from '@mui/material/SvgIcon'

export const StyledCard = styled(Card, {
  // Configure which props should be forwarded on DOM
  shouldForwardProp: (prop) => prop !== 'bgColor',
})(({ bgColor, theme }) => ({
  backgroundColor: bgColor,
  borderRadius: theme.shape.borderRadius * 3,
}))

export const StyledIconContainer = styled('div')({
  position: 'absolute',
  right: 16,
  top: 16,
  opacity: 0.2,
  [`.${svgIconClasses.root}`]: {
    fontSize: '5rem',
  },
})
