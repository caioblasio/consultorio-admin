import React, { forwardRef } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Slide, alpha } from '@mui/material'
import { CheckCircle, Error, Warning, Info } from '@mui/icons-material'

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
        backgroundColor: alpha(theme.palette.background.default, 0.75),
        backdropFilter: `blur(${theme.spacing(2)})`,
        [theme.breakpoints.up('sm')]: {
          padding: theme.spacing(0, 8),
        },
      }),
    },
  },
  MuiBackdrop: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: alpha(theme.palette.grey.dark, 0.25),
        backdropFilter: `blur(${theme.spacing(0.5)})`,
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
          color: theme.palette.primary.main,
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

        ...(ownerState.variant === 'contained' && {
          '&:hover': {
            boxShadow: theme.shadows[0],
          },
        }),

        ...(ownerState.variant === 'outlined' &&
          ownerState.color === 'grey' && {
            color: theme.palette.grey.dark,
            borderColor: theme.palette.grey.dark,
            '&:hover': {
              borderColor: theme.palette.grey.dark,
              backgroundColor: alpha(
                theme.palette.grey.dark,
                theme.palette.action.hoverOpacity
              ),
            },
          }),

        ...(ownerState.variant === 'text' &&
          ownerState.color === 'grey' && {
            color: theme.palette.grey.dark,
            '&:hover': {
              backgroundColor: alpha(
                theme.palette.grey.dark,
                theme.palette.action.hoverOpacity
              ),
            },
          }),
      }),
    },
  },
  MuiSnackbar: {
    defaultProps: {
      anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
      TransitionComponent: (props) => <Slide {...props} direction="up" />,
      autoHideDuration: 6000,
    },
  },
  MuiAlert: {
    defaultProps: {
      iconMapping: {
        success: <CheckCircle />,
        info: <Info />,
        warning: <Warning />,
        error: <Error />,
      },
    },
    styleOverrides: {
      root: ({ theme }) => ({
        color: theme.palette.common.black,

        '& .MuiAlert-icon': {
          opacity: 1,
        },

        '&.MuiAlert-standardSuccess': {
          backgroundColor: theme.palette.success.light,

          '& .MuiAlert-icon': {
            color: theme.palette.success.dark,
          },
        },

        '&.MuiAlert-standardError': {
          backgroundColor: theme.palette.error.light,

          '& .MuiAlert-icon': {
            color: theme.palette.error.dark,
          },
        },
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
  MuiIconButton: {
    defaultProps: {
      color: 'grey',
    },
    styleOverrides: {
      root: ({ ownerState, theme }) => ({
        ...(ownerState.color === 'grey' && {
          color: theme.palette.grey.dark,
          '&:hover': {
            backgroundColor: alpha(
              theme.palette.grey.dark,
              theme.palette.action.hoverOpacity
            ),
          },
        }),
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
          '& .MuiFormHelperText-root': {
            textTransform: 'none',
          },
          '& .MuiInputBase-root': {
            borderRadius: theme.shape.borderRadius,
          },

          '& .MuiOutlinedInput-root.MuiInputBase-root': {
            backgroundColor: theme.palette.grey.light,

            '& .MuiOutlinedInput-notchedOutline': {
              borderWidth: 0,
            },
            '&.Mui-focused, &.Mui-error': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderWidth: 1,
              },
            },
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
  MuiInputAdornment: {
    styleOverrides: {
      root: ({ theme }) => ({
        color: theme.palette.grey.dark,
      }),
    },
  },
  MuiBreadcrumbs: {
    styleOverrides: {
      separator: ({ theme }) => ({
        fontSize: theme.typography.h3.fontSize,
      }),
      ol: {
        alignItems: 'baseline',
      },
    },
  },
  MuiToggleButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        '&.Mui-selected': {
          color: theme.palette.common.white,
          backgroundColor: theme.palette.grey.dark,
          '&:hover': {
            backgroundColor: theme.palette.grey.dark,
          },
        },
      }),
    },
  },
}

export default components
