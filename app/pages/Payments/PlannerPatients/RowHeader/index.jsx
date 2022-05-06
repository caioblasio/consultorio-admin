import React from 'react'
import NavLink from 'containers/NavLink'
import { patientURL } from 'configs/urls'

const RowHeaderPatients = ({ row: { id, label } }) => {
  return (
    <NavLink underline="always" to={patientURL(id)}>
      {label}
    </NavLink>
  )
}

export default RowHeaderPatients
