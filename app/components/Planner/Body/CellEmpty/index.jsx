import React from 'react'

import PlannerCell from 'components/Planner/Cell'

const PlannerCellEmpty = ({ onCreate }) => {
  return <PlannerCell onClick={onCreate} />
}

export default PlannerCellEmpty
