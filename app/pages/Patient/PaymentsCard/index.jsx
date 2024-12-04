import React, { Fragment, useCallback, useState, useMemo } from 'react'
import useAsyncEffect from 'use-async-effect'
import { capitalize } from 'lodash-es'
import {
  Stack,
  Grid,
  Typography,
  IconButton,
  Divider,
  useTheme,
} from '@mui/material'
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  SaveAltRounded as SaveIcon,
} from '@mui/icons-material'
import { fetchPaymentsWithinRangeByPatient } from 'api/database'
import { formatCurrency } from 'utils/currency'
import { exportToPdf } from 'utils/export'
import Card from 'components/Card'
import useDateAdapter from 'hooks/useDateAdapter'
import PdfTemplate from './PdfTemplate'

const PaymentsCard = ({ patient, holders, isLoading }) => {
  const theme = useTheme()
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)

  const adapter = useDateAdapter()
  const currentYear = new Date().getFullYear()

  const [year, setYear] = useState(currentYear)

  useAsyncEffect(
    async (isMounted) => {
      setLoading(true)
      if (isLoading) {
        return
      }

      const startDate = new Date(year, 0, 1)
      const endDate = new Date(year, 11, 31, 23, 59, 59)

      const payments = await fetchPaymentsWithinRangeByPatient(
        patient.id,
        startDate,
        endDate
      )
      if (!isMounted()) {
        return
      }

      setPayments(payments)
      setLoading(false)
    },
    [isLoading, year]
  )

  const getPaymentColor = (status) => {
    const colors = {
      paid: 'success.dark',
      forgiven: 'info.dark',
      owing: 'error.dark',
      noData: 'grey.dark',
      default: 'text.primary',
    }
    return colors[status] || colors.default
  }

  const report = useMemo(() => {
    let result = []

    let total = 0

    const getValueForMonth = (dateMonth, shouldHavePaymentInfo) => {
      const payment = payments.find((payment) =>
        adapter.isSameMonth(dateMonth, payment.reference)
      )

      const paymentStatus = payment?.status

      total += payment?.value || 0
      return (
        <Typography
          color={getPaymentColor(
            shouldHavePaymentInfo ? paymentStatus : 'noData'
          )}
        >
          {formatCurrency(payment?.value || 0, true)}
        </Typography>
      )
    }

    for (let i = 0; i < 12; i++) {
      const dateMonth = new Date(year, i)
      const month = adapter.format(dateMonth, 'month')

      const shouldHavePaymentInfo =
        adapter.isBefore(patient?.treatmentBegin, dateMonth) ||
        adapter.isSameMonth(patient?.treatmentBegin, dateMonth)

      const item = (
        <Grid container justifyContent="space-between" key={`${month}-${i}`}>
          <Grid item>
            <Typography
              color={shouldHavePaymentInfo ? 'text.primary' : 'grey.dark'}
            >
              {capitalize(month)}
            </Typography>
          </Grid>
          <Grid item>{getValueForMonth(dateMonth, shouldHavePaymentInfo)}</Grid>
        </Grid>
      )
      result = [...result, item]
    }

    result = [
      ...result,
      <Fragment key="total">
        <Divider />
        <Grid container justifyContent="space-between" alignItems="baseline">
          <Grid item>
            <Typography color="grey.dark">Total</Typography>
          </Grid>
          <Grid item>
            <Typography color={getPaymentColor()} variant="title1">
              {formatCurrency(total, true)}
            </Typography>
          </Grid>
        </Grid>
      </Fragment>,
    ]

    return result
  }, [year, payments])

  const downloadReport = useCallback(
    () =>
      exportToPdf(
        <PdfTemplate
          patient={patient}
          data={payments}
          holders={holders}
          year={year}
          dateAdapter={adapter}
          theme={theme}
        />,
        {
          filename: `${__dirname}/paciente_pagamentos-${Date.now()}`,
        }
      ),
    [patient, payments, holders]
  )

  return (
    <Card
      title="Pagamentos"
      actions={[
        {
          icon: <SaveIcon />,
          label: 'Descarregar relatório',
          onClick: downloadReport,
        },
      ]}
      color="success"
      isLoading={loading}
    >
      <Stack spacing={2}>
        <Grid container alignItems="center">
          <Grid item>
            <IconButton
              onClick={() => setYear(year - 1)}
              disabled={year === patient?.treatmentBegin?.getFullYear()}
            >
              <ChevronLeftIcon />
            </IconButton>
          </Grid>
          <Grid item xs>
            <Typography align="center">{year}</Typography>
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
        <Stack spacing={2}>{report}</Stack>
      </Stack>
    </Card>
  )
}

export default PaymentsCard
