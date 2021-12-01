import React, { useContext, useState, useEffect } from 'react'
import { Typography } from '@mui/material'
import { AuthContext } from 'contexts/Auth'
import Dashboard from 'pages/dashboard'
import { fetchPatientsCount } from 'api/database'

const Home = () => {
  const { currentUser } = useContext(AuthContext)
  const title = `Bem-vindo ${currentUser.displayName},`

  const [count, setCount] = useState(0)

  useEffect(async () => {
    const count = await fetchPatientsCount()
    setCount(count)
  }, [])

  return (
    <Dashboard title={title}>
      <Typography>{count}</Typography>
    </Dashboard>
  )
}

export default Home
