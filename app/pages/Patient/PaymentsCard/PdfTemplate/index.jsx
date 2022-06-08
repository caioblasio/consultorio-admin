import React from 'react'
import { Page, View, Document, Text } from '@react-pdf/renderer'

import Logo from './Logo'
import {
  page,
  section,
  title,
  category,
  categoryTitle,
  flexContainer,
} from './styles'

const PdfTemplate = ({ patient, holders, theme, data }) => {
  const holder = holders.find(({ id }) => id === patient.holderId)

  return (
    <Document>
      <Page size="A4" style={page(theme)}>
        <View style={section(theme)}>
          <Logo />
        </View>
        <View style={section(theme)}>
          <Text style={title(theme)}>{patient.name}</Text>
          <View style={flexContainer(theme)}>
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
          {data.map(({ reference, status, value }) => (
            <View
              style={{
                ...flexContainer(theme),
                justifyContent: 'space-between',
              }}
            >
              <Text>{reference.getMonth()}</Text>
              <Text>{status}</Text>
              <Text>{value}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  )
}

export default PdfTemplate
