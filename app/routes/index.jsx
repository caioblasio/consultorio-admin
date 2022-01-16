import React from 'react'
import { Switch } from 'react-router-dom'
import PrivateRoutes from './Private'
import PublicRoutes from './Public'

const Navigation = () => {
  return (
    <Switch>
      {PrivateRoutes}
      {PublicRoutes}
    </Switch>
  )
}

export default Navigation
