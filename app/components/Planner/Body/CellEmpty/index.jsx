import React from 'react'

import PlannerCell from 'components/Planner/Cell'

const PlannerCellEmpty = ({ onCreate, disableClick }) => {
  return <PlannerCell onClick={!disableClick ? onCreate : undefined} />
}

export default PlannerCellEmpty
