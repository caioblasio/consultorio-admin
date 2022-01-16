import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import App from 'containers/App'
import theme from 'theme'
import 'configs/firebase'

ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById('app')
)
