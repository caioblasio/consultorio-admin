import React, { createContext, useState } from 'react'

export const SaveContext = createContext()

export const SaveProvider = ({ children }) => {
  const [saving, setSaving] = useState(false)
  return (
    <SaveContext.Provider
      value={{
        onSaving: setSaving,
        saving,
      }}
    >
      {children}
    </SaveContext.Provider>
  )
}
