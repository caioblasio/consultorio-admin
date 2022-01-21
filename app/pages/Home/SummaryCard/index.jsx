import React, { useState } from 'react'
import useAsyncEffect from 'use-async-effect'
import { CardContent, Typography, Stack } from '@mui/material'
import {
  fetchPaymentsWithinRange,
  fetchPatientsWithinDateRange,
} from 'api/database'
import { formatCurrency, centesimalToStandard } from 'utils/currency'
import { StyledCard, StyledSummarySectionTitle, StyledSkeleton } from './styles'

const SummaryCard = ({ className }) => {
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
        <StyledSkeleton
          variant="rectangular"
          animation="wave"
          className={className}
        />
      ) : (
        <StyledCard className={className}>
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
