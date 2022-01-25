import React from 'react'
import { useNavigate } from 'react-router-dom'

import DataCardComponent from 'components/DataCard'

const DataCard = ({
  isLoading,
  title,
  data,
  icon,
  navigateTo,
  className,
  color,
}) => {
  const navigate = useNavigate()
  return (
    <DataCardComponent
      isLoading={isLoading}
      title={title}
      data={data}
      icon={icon}
      color={color}
      className={className}
      onClick={() => navigate(navigateTo)}
    />
  )
}

export default DataCard
