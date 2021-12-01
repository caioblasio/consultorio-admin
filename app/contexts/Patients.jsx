import React, { useEffect, useState } from 'react'
import { fetchPatientsCount } from 'api/database'

export const PatientsContext = React.createContext()

export const PatientsProvider = ({ children }) => {
  const [patients, setPatients] = useState([])
  const [pending, setPending] = useState(true)

  useEffect(async () => {}, [])

  if (pending) {
    return <>Loading...</>
  }

  return (
    <PatientsContext.Provider
      value={{
        patients,
      }}
    >
      {children}
    </PatientsContext.Provider>
  )
}
