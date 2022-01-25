import React from 'react'
import { Routes } from 'react-router-dom'
import PrivateRoutes from './Private'
import PublicRoutes from './Public'

const Navigation = () => {
  return (
    <Routes>
      {PrivateRoutes}
      {PublicRoutes}
    </Routes>
  )
}

export default Navigation
