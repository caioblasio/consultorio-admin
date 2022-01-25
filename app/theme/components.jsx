import React, { forwardRef } from 'react'
import { Link as RouterLink } from 'react-router-dom'

const LinkBehavior = forwardRef((props, ref) => {
  const { href, ...other } = props
  return <RouterLink ref={ref} to={href} {...other} />
})

const components = {
  MuiContainer: {
    styleOverrides: {
      root: ({ theme }) => ({
        [theme.breakpoints.up('sm')]: {
          padding: theme.spacing(8),
        },
      }),
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: ({ theme }) => ({
        [theme.breakpoints.up('sm')]: {
          padding: theme.spacing(0, 8),
        },
      }),
    },
  },
  MuiButtonBase: {
    defaultProps: {
      disableRipple: true,
      LinkComponent: LinkBehavior,
    },
  },
  MuiLink: {
    defaultProps: {
      color: 'grey.dark',
      underline: 'none',
      component: LinkBehavior,
    },
    styleOverrides: {
      root: ({ theme }) => ({
        transition: theme.transitions.create('color'),
        '&:hover': {
          color: theme.palette.primary.dark,
        },
      }),
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
  MuiModal: {
    styleOverrides: {
      root: ({ theme }) => ({
        '& .MuiPaper-root': {
          boxShadow: theme.shadows[3],
        },
      }),
    },
  },
  MuiPaper: {
    defaultProps: {
      elevation: 1,
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
          '& .MuiInputBase-root': {
            backgroundColor: theme.palette.grey.light,
            borderRadius: theme.shape.borderRadius,
          },

          '& .MuiInputLabel-outlined:not(.Mui-focused):not(.MuiFormLabel-filled)':
            {
              transform: `translate(${theme.spacing(2)}, ${theme.spacing(
                1
              )}) scale(1)`,
            },

          '& .MuiOutlinedInput-root:not(.Mui-error) .MuiOutlinedInput-notchedOutline':
            {
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
