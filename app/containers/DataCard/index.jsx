import React from 'react'
import { useHistory } from 'react-router-dom'

import DataCardComponent from 'components/DataCard'

const DataCard = ({ isLoading, title, data, icon, navigateTo }) => {
  const history = useHistory()
  return (
    <DataCardComponent
      isLoading={isLoading}
      title={title}
      data={data}
      icon={icon}
      onClick={() => history.replace(navigateTo)}
    />
  )
}

export default DataCard
