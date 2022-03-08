import React, { useState, useContext } from 'react'
import useAsyncEffect from 'use-async-effect'
import { capitalize } from 'lodash-es'
import {
  Stack,
  Grid,
  Typography,
  IconButton,
  ToggleButtonGroup,
  ToggleButton,
  Divider,
} from '@mui/material'
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material'
import { fetchPaymentsWithinRangeByPatient } from 'api/database'
import { DateContext } from 'contexts/Date'
import { formatCurrency } from 'utils/currency'
import Card from 'components/Card'

const PaymentsCard = ({ patient }) => {
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)

  const adapter = useContext(DateContext)
  const currentYear = new Date().getFullYear()

  const [report, setReport] = useState('reference')
  const [year, setYear] = useState(currentYear)

  const handleReport = (event, newReport) => {
    if (newReport) {
      setReport(newReport)
    }
  }

  const startDate = new Date(year, 0, 1)
  const endDate = new Date(year, 11, 31, 23, 59, 59)

  useAsyncEffect(async (isActive) => {
    const payments = await fetchPaymentsWithinRangeByPatient(
      patient.id,
      startDate,
      endDate
    )
    if (!isActive()) return
    setPayments(payments)
    setLoading(false)
  }, [])

  console.log(payments)

  const getPaymentColor = (status) => {
    const colors = {
      paid: 'success.dark',
      forgiven: 'info.dark',
      due: 'error.dark',
      default: 'text.primary',
    }
    return colors[status] || colors.default
  }

  const generateReport = () => {
    let result = []

    let total = 0

    const getValueForMonth = (dateMonth) => {
      if (report === 'reference') {
        const payment = payments.find((payment) =>
          adapter.isSameMonth(dateMonth, payment.reference)
        )

        total = total + (payment ? payment.value : 0)
        return (
          <Typography color={getPaymentColor(payment?.status)}>
            {formatCurrency(payment?.value || 0, true)}
          </Typography>
        )
      }

      if (report === 'income') {
        const paymentsMadeAtMonth = payments.filter((payment) =>
          adapter.isSameMonth(dateMonth, payment.madeAt)
        )

        const monthTotal = paymentsMadeAtMonth.reduce(
          (acc, cur) => acc + cur.value,
          0
        )

        total = total + monthTotal

        return (
          <Typography color={getPaymentColor()}>
            {formatCurrency(monthTotal, true)}
          </Typography>
        )
      }
    }

    for (let i = 0; i < 12; i++) {
      const dateMonth = new Date(year, i)
      const month = adapter.format(dateMonth, 'LLLL')

      const item = (
        <Grid container justifyContent="space-between" key={`${month}-${i}`}>
          <Grid item>
            <Typography color="text.secondary">{capitalize(month)}</Typography>
          </Grid>
          <Grid item>{getValueForMonth(dateMonth)}</Grid>
        </Grid>
      )
      result = [...result, item]
    }

    result = [
      ...result,
      <>
        <Divider />
        <Grid container justifyContent="space-between">
          <Grid item>
            <Typography color="text.secondary">Total</Typography>
          </Grid>
          <Grid item>
            <Typography color={getPaymentColor()}>
              {formatCurrency(total, true)}
            </Typography>
          </Grid>
        </Grid>
      </>,
    ]

    return result
  }

  return (
    <Card title="Pagamentos" color="success">
      <Stack spacing={2}>
        <ToggleButtonGroup
          value={report}
          exclusive
          onChange={handleReport}
          color="grey"
          fullWidth
        >
          <ToggleButton value="reference">Mensalidade</ToggleButton>
          <ToggleButton value="income">Receita</ToggleButton>
        </ToggleButtonGroup>
        <Grid container alignItems="center">
          <Grid item>
            <IconButton onClick={() => setYear(year - 1)}>
              <ChevronLeftIcon />
            </IconButton>
          </Grid>
          <Grid item xs>
            <Typography align="center" color="text.primary">
              {year}
            </Typography>
          </Grid>
          <Grid item>
            <IconButton
              disabled={year === currentYear}
              onClick={() => setYear(year + 1)}
            >
              <ChevronRightIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Stack spacing={2}>{generateReport()}</Stack>
      </Stack>
    </Card>
  )
}

export default PaymentsCard
