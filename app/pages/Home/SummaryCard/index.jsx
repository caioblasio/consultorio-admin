import React, { useState } from 'react'
import useAsyncEffect from 'use-async-effect'
import { CardContent, Typography, Stack } from '@mui/material'
import {
  fetchPaymentsWithinRangeByMadeAtDate,
  fetchPatientsCountWithinDateRangeByTreatmentBeginDate,
} from 'api/database'
import { formatCurrency, centesimalToStandard } from 'utils/currency'
import { getCurrentMonthDateRange } from 'utils/date'
import { StyledCard, StyledSummarySectionTitle, StyledSkeleton } from './styles'

const SummaryCard = ({ className }) => {
  const [amount, setAmount] = useState(0)
  const [patientsCount, setPatientsCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useAsyncEffect(async (isMounted) => {
    const { startDate, endDate } = getCurrentMonthDateRange()

    const payments = await fetchPaymentsWithinRangeByMadeAtDate(
      startDate,
      endDate
    )
    const amount = payments.reduce((acc, cur) => acc + cur.value, 0)
    const patientsCount =
      await fetchPatientsCountWithinDateRangeByTreatmentBeginDate(
        startDate,
        endDate
      )

    if (!isMounted()) return

    setAmount(amount)
    setPatientsCount(patientsCount)
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
            <Stack spacing={6}>
              <Typography variant="h1">Resumo</Typography>
              <div>
                <StyledSummarySectionTitle variant="subtitle1">
                  Receita no mês
                </StyledSummarySectionTitle>
                <Typography variant="h2">
                  {formatCurrency(centesimalToStandard(amount))}
                </Typography>
              </div>
              <div>
                <StyledSummarySectionTitle variant="subtitle1">
                  Novos Pacientes no mês
                </StyledSummarySectionTitle>
                <Typography variant="h2">{patientsCount}</Typography>
              </div>
            </Stack>
          </CardContent>
        </StyledCard>
      )}
    </>
  )
}

export default SummaryCard
