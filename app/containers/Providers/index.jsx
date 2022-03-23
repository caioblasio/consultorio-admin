import React from 'react'
import { ThemeProvider } from '@mui/material'

import App from 'containers/App'
import { AuthProvider } from 'contexts/Auth'
import { DateProvider } from 'contexts/Date'
import { SaveProvider } from 'contexts/Save'

import theme from 'theme'

const Component = () => {
  return (
    <ThemeProvider theme={theme}>
      <DateProvider>
        <AuthProvider>
          <SaveProvider>
            <App />
          </SaveProvider>
        </AuthProvider>
      </DateProvider>
    </ThemeProvider>
  )
}

export default Component
