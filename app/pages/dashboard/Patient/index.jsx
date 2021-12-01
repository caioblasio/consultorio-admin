import React from 'react'
import Dashboard from 'pages/dashboard'

const Patient = () => {
  return (
    <Dashboard title="Pacientes">
      <div>
        {patients.map((patient) => (
          <div key={patient.id}>{patient.name}</div>
        ))}
      </div>
    </Dashboard>
  )
}

export default Patient
