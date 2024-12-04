import React, { useMemo } from 'react'
import { Page, View, Document, Text } from '@react-pdf/renderer'
import { capitalize } from 'lodash-es'
import { formatCurrency } from 'utils/currency'
import { PAYMENT_STATUS_DICTIONARY } from 'constants/paymentStatus'
import Logo from './Logo'
import {
  page,
  section,
  title,
  category,
  categoryTitle,
  flexContainer,
  row,
  rowItem,
} from './styles'

const PdfTemplate = ({ patient, holders, theme, data, dateAdapter, year }) => {
  const holder = holders.find(({ id }) => id === patient.holderId)

  const getPaymentReport = () => {
    let result = []

    for (let i = 0; i < 12; i++) {
      const dateMonth = new Date(year, i)
      const month = dateAdapter.format(dateMonth, 'month')

      const payment = data.find((payment) =>
        dateAdapter.isSameMonth(dateMonth, payment.reference)
      )

      const paymentStatus = payment?.status

      const item = (
        <View
          style={{
            ...flexContainer(),
            ...row(theme, paymentStatus),
          }}
        >
          <Text style={rowItem()}>{capitalize(month)}</Text>
          <Text style={rowItem()}>
            {PAYMENT_STATUS_DICTIONARY[paymentStatus]}
          </Text>
          <Text style={rowItem()}>
            {formatCurrency(payment?.value || 0, true)}
          </Text>
        </View>
      )
      result = [...result, item]
    }
    return result
  }

  const paymentsTotal = useMemo(
    () => data.reduce((total, payment) => total + payment?.value ?? 0, 0),
    [year]
  )

  return (
    <Document>
      <Page size="A4" style={page(theme)}>
        <View style={section(theme)}>
          <Logo />
        </View>
        <View style={section(theme)}>
          <Text style={title(theme)}>{patient.name}</Text>
          <View style={flexContainer()}>
            <View style={category(theme)}>
              <Text style={categoryTitle(theme)}>Celular</Text>
              <Text>{patient.phone.join(', ')}</Text>
            </View>
            <View style={category(theme)}>
              <Text style={categoryTitle(theme)}>Responsável</Text>
              <Text>
                {holder.name} ({holder.cpf})
              </Text>
            </View>
          </View>
        </View>
        <View style={section(theme)}>
          <Text style={title(theme)}>{year}</Text>
          {getPaymentReport()}
        </View>
        <View style={section(theme)}>
          <View style={flexContainer({ justifyContent: 'space-between' })}>
            <Text style={title(theme)}>Total</Text>
            <Text style={title(theme)}>
              {formatCurrency(paymentsTotal, true)}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  )
}

export default PdfTemplate
