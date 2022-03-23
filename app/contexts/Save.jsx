import React, { createContext, useCallback, useState } from 'react'

export const SaveContext = createContext()

export const SaveProvider = ({ children }) => {
  const [saving, setSaving] = useState(false)
  const handleSaving = useCallback(
    async (callPromise) => {
      let data
      setSaving(true)
      try {
        data = await callPromise()
      } finally {
        setSaving(false)
      }

      return data
    },
    [saving]
  )
  return (
    <SaveContext.Provider
      value={{
        onSaving: handleSaving,
        saving,
      }}
    >
      {children}
    </SaveContext.Provider>
  )
}
