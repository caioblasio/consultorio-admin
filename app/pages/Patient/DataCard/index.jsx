import React from 'react'

import Card from 'components/Card'

const DataCard = ({ patient }) => {
  return (
    <Card title="Detalhes" color="info">
      {patient.name}
    </Card>
  )
}

export default DataCard
