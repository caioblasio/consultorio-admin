import React from 'react'
import DateFnsAdapter from '@date-io/date-fns'
import { ptBR } from 'date-fns/locale'

const dateAdapter = new DateFnsAdapter({ locale: ptBR })

export const DateContext = React.createContext()

export const DateProvider = ({ children }) => {
  return (
    <DateContext.Provider value={dateAdapter}>{children}</DateContext.Provider>
  )
}
