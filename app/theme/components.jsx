import React from 'react'
import { Slide, alpha } from '@mui/material'
import { CheckCircle, Error, Warning, Info } from '@mui/icons-material'

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
  MuiCssBaseline: {
    styleOverrides: {
      html: {
        width: '100vw',
        height: '100vh',
      },
      'html, body, #app': {
        display: 'flex',
        flexDirection: 'column',
        flex: '1 1 auto',
      },
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: alpha(theme.palette.background.default, 0.75),
        backdropFilter: `blur(${theme.spacing(1)})`,
        [theme.breakpoints.up('sm')]: {
          padding: theme.spacing(0, 8),
        },
      }),
    },
  },
  MuiBackdrop: {
    styleOverrides: {
      root: ({ theme }) => ({
        '&:not(.MuiBackdrop-invisible)': {
          backgroundColor: alpha(theme.palette.grey.dark, 0.25),
          backdropFilter: `blur(${theme.spacing(0.5)})`,
        },
      }),
    },
  },
  MuiButtonBase: {
    defaultProps: {
      disableRipple: true,
    },
  },
  MuiLink: {
    defaultProps: {
      color: 'common.black',
      underline: 'none',
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
            boxShadow: theme.shadows[1],
            backgroundColor: theme.palette[ownerState.color].main,
          },
        }),

        ...(ownerState.variant === 'outlined' && {
          '&:hover': {
            boxShadow: theme.shadows[1],
          },

          ...(ownerState.color === 'grey' && {
            color: theme.palette.grey.dark,
            borderColor: theme.palette.grey.dark,
            '&:hover': {
              boxShadow: theme.shadows[1],
              borderColor: theme.palette.grey.dark,
            },
          }),
        }),

        ...(ownerState.variant === 'text' && {
          '&:hover': {
            boxShadow: theme.shadows[1],
          },

          ...(ownerState.color === 'grey' && {
            color: theme.palette.grey.dark,
            '&:hover': {
              boxShadow: theme.shadows[1],
              backgroundColor: theme.palette.grey.light,
            },
          }),
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
    styleOverrides: {
      root: ({ theme }) => ({
        '& .MuiPaper-root': {
          boxShadow: theme.shadows[1],
        },
      }),
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
          boxShadow: theme.shadows[1],
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
    defaultProps: {
      placement: 'top-end',
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
        '& .MuiOutlinedInput-root': {
          transition: theme.transitions.create('all'),
          '&:not(.Mui-disabled)': {
            '&:hover, &.Mui-focused': {
              boxShadow: theme.shadows[1],
            },

            '&.Mui-focused': {
              boxShadow: `${theme.palette.primary.main} 0px 4px 0px`,

              '&.Mui-error': {
                boxShadow: `${theme.palette.error.main} 0px 4px 0px`,
              },
            },
          },
        },
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
  MuiMenuItem: {
    styleOverrides: {
      root: ({ theme }) => ({
        transition: theme.transitions.create('all'),
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
  MuiDataGrid: {
    styleOverrides: {
      root: ({ theme }) => ({
        border: 'none',
        '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
          padding: theme.spacing(0, 3),
        },
        '& .MuiDataGrid-columnHeaders': {
          border: 'none',
          '& .MuiDataGrid-columnHeader': {
            '&:focus, &:focus-within': {
              outline: 'none',
            },
          },
          '& .MuiDataGrid-columnSeparator': {
            display: 'none',
          },
        },
        '& .MuiDataGrid-row': {
          '& .MuiDataGrid-cell': {
            '&:focus, &:focus-within': {
              outline: 'none',
            },
          },
          '&:hover': {
            backgroundColor: 'transparent',
            '& .MuiDataGrid-actionsCell .MuiIconButton-root': {
              opacity: 1,
            },
          },
        },
      }),
    },
  },
  MuiTabs: {
    styleOverrides: {
      root: ({ theme }) => ({
        marginBottom: theme.spacing(2),
      }),
    },
  },
}

export default components
