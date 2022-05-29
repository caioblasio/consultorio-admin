import React from 'react'
import { Page, View, Document, Text } from '@react-pdf/renderer'

import Logo from './Logo'
import { page, section } from './styles'

const PdfTemplate = ({ patient, holders }) => {
  const holder = holders.find(({ id }) => id === patient.holderId)

  return (
    <Document>
      <Page size="A4" style={page}>
        <View style={section}>
          <Logo />
        </View>
        <View style={section}>
          <Text>{patient.name}</Text>
          <Text>{`Celular ${patient.phone}`}</Text>
          <Text>{`Responsável ${holder.name} (${holder.cpf})`}</Text>
        </View>
      </Page>
    </Document>
  )
}

export default PdfTemplate
