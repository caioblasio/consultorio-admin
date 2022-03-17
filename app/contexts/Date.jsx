import React from 'react'
import DateAdapter from '@mui/lab/AdapterDateFns'
import { LocalizationProvider, MuiPickersAdapterContext } from '@mui/lab'
import { ptBR } from 'date-fns/locale'

export const DateContext = MuiPickersAdapterContext

export const DateProvider = ({ children }) => {
  return (
    <LocalizationProvider dateAdapter={DateAdapter} locale={ptBR}>
      {children}
    </LocalizationProvider>
  )
}
