import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import useAsyncEffect from 'use-async-effect'
import { Grid } from '@mui/material'

import { fetchHolderById, editHolder } from 'api/database'
import Breadcrumbs from 'containers/Breadcrumbs'
import Page from 'containers/Page'
import { SaveContext } from 'contexts/Save'

import HolderCard from './HolderCard'
import PaymentsCard from './PaymentsCard'

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

  const onEditHolder = async (holder) => {
    await onSaving(() => editHolder(holder))
    setHolder(holder)
  }

  return (
    <Page
      breadcrumbs={<Breadcrumbs current={holder?.name} isLoading={loading} />}
    >
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <HolderCard
            holder={holder}
            isLoading={loading}
            onEdit={onEditHolder}
          />
        </Grid>
        <Grid item xs={6}>
          <PaymentsCard holder={holder} isLoading={loading} />
        </Grid>
        <Grid item xs={6} />
      </Grid>
    </Page>
  )
}

export default HolderPage
