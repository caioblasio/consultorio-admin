import colors from './colors'

const components = {
  MuiButtonBase: {
    defaultProps: {
      disableRipple: true,
    },
  },
  MuiTooltip: {
    styleOverrides: {
      tooltip: {
        backgroundColor: colors.common.black,
      },
      arrow: {
        color: colors.common.black,
      },
    },
  },
}

export default components
