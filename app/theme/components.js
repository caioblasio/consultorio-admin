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
  MuiCssBaseline: {
    styleOverrides: {
      html: {
        width: '100vw',
        height: '100vh',
      },
      body: {
        width: '100%',
        height: '100%',
      },
    },
  },
}

export default components
