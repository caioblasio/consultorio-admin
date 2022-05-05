import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import useAsyncEffect from 'use-async-effect'
import { Grid } from '@mui/material'
import { fetchHolderById } from 'api/database'
import Breadcrumbs from 'containers/Breadcrumbs'
import Page from 'containers/Page'
import { SaveContext } from 'contexts/Save'
import HolderCard from './HolderCard'

const HolderPage = () => {
  const [holder, setHolder] = useState()
  const [loading, setLoading] = useState(true)
  const { onSaving } = useContext(SaveContext)

  const { holderId } = useParams()

  useAsyncEffect(async (isMounted) => {
    const holder = await fetchHolderById(holderId)
    setLoading(true)
    if (!isMounted()) {
      return
    }

    setHolder(holder)
    setLoading(false)
  }, [])

  return (
    <Page
      breadcrumbs={<Breadcrumbs current={holder?.name} isLoading={loading} />}
    >
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <HolderCard holder={holder} isLoading={loading} onSaving={onSaving} />
        </Grid>
        <Grid item xs={6}>
          {/* <PaymentsCard patient={patient} isLoading={loading} /> */}
        </Grid>
      </Grid>
    </Page>
  )
}

export default HolderPage
