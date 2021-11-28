import React from 'react'
import { Switch } from 'react-router-dom'
import PrivateRoutes from './Private'
import PublicRoutes from './Public'

const Navigation = () => {
  return (
    <div>
      <Switch>
        {PrivateRoutes}
        {PublicRoutes}
      </Switch>
    </div>
  )
}

export default Navigation
