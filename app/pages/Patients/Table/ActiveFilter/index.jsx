import React from 'react'
import Switch from 'components/Switch'

const PatientsActiveFilter = ({ value, onChange, disabled }) => {
  return (
    <Switch
      label="Mostrar todos"
      value={value}
      onChange={(_, newValue) => onChange(newValue)}
      disabled={disabled}
    />
  )
}

export default PatientsActiveFilter
