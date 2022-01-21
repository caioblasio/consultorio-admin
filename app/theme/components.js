const components = {
  MuiButtonBase: {
    defaultProps: {
      disableRipple: true,
    },
  },
  MuiButton: {
    defaultProps: {
      color: 'grey',
    },
    styleOverrides: {
      root: ({ ownerState, theme }) => ({
        padding: theme.spacing(1, 2),
        boxShadow: 'none',

        ...(ownerState.variant === 'outlined' &&
          ownerState.color === 'grey' && {
            color: theme.palette.grey.dark,
            borderColor: theme.palette.grey.dark,
          }),
      }),
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        boxShadow: '0px 20px 16px 0px #C6C6C633',
      },
    },
  },
  MuiTooltip: {
    styleOverrides: {
      tooltip: ({ theme }) => ({
        backgroundColor: theme.palette.common.black,
      }),
      arrow: ({ theme }) => ({
        color: theme.palette.common.black,
      }),
    },
  },
  MuiTableHead: {
    styleOverrides: {
      root: ({ theme }) => ({
        '& .MuiTableCell-root': {
          color: theme.palette.grey.dark,
          padding: theme.spacing(1, 2),
        },
      }),
    },
  },
  MuiTextField: {
    defaultProps: {
      variant: 'outlined',
      fullWidth: true,
    },
    styleOverrides: {
      root: ({ ownerState, theme }) => ({
        ...(ownerState.variant === 'outlined' && {
          backgroundColor: theme.palette.grey.light,
          borderRadius: theme.shape.borderRadius,

          '& .MuiInputLabel-outlined:not(.Mui-focused)': {
            transform: `translate(${theme.spacing(2)}, ${theme.spacing(
              1
            )}) scale(1)`,
          },

          '& .MuiOutlinedInput-notchedOutline': {
            borderWidth: 0,
          },

          '& .MuiInputBase-adornedStart .MuiOutlinedInput-input': {
            paddingLeft: 0,
          },

          '& .MuiOutlinedInput-input': {
            padding: theme.spacing(1.15, 2, 1, 2),
          },
        }),
      }),
    },
  },
}

export default components
