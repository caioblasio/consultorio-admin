import React, { useState, useEffect } from 'react'
import useAsyncEffect from 'use-async-effect'
import { CardContent, Typography, Skeleton, Stack } from '@mui/material'
import {
  fetchPaymentsWithinRange,
  fetchPatientsWithinDateRange,
} from 'api/database'
import { formatCurrency, centesimalToStandard } from 'utils/currency'
import { StyledCard, StyledSummarySectionTitle } from './styles'

const SummaryCard = () => {
  const [amount, setAmount] = useState(0)
  const [patientsCount, setPatientsCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useAsyncEffect(async (isActive) => {
    // Date picker values
    const now = new Date()
    const startDate = new Date(now.getFullYear(), now.getMonth())
    const endDate = new Date(now.getFullYear(), now.getMonth() + 1)
    const payments = await fetchPaymentsWithinRange(startDate, endDate)
    const amount = payments.reduce((_, cur) => cur.value, 0)

    const patients = await fetchPatientsWithinDateRange(startDate, endDate)
    if (!isActive()) return
    setAmount(amount)
    setPatientsCount(patients.length)
    setIsLoading(false)
  }, [])

  return (
    <>
      {isLoading ? (
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{ borderRadius: 4 }}
        />
      ) : (
        <StyledCard>
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="h1">Resumo</Typography>
              <div>
                <StyledSummarySectionTitle variant="button">
                  Saldo
                </StyledSummarySectionTitle>
                <Typography variant="h1">
                  {formatCurrency(centesimalToStandard(amount))}
                </Typography>
              </div>
              <div>
                <StyledSummarySectionTitle variant="button">
                  Pacientes
                </StyledSummarySectionTitle>
                <Typography variant="h1">{patientsCount}</Typography>
              </div>
            </Stack>
          </CardContent>
        </StyledCard>
      )}
    </>
  )
}

export default SummaryCard
