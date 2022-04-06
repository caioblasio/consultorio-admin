import React from 'react'
import { LocalizationProvider, MuiPickersAdapterContext } from '@mui/lab'
import { ptBR } from 'date-fns/locale'
import DateAdapter from './DateAdapter'

export const DateContext = MuiPickersAdapterContext

export const DateProvider = ({ children }) => {
  return (
    <LocalizationProvider dateAdapter={DateAdapter} locale={ptBR}>
      {children}
    </LocalizationProvider>
  )
}
