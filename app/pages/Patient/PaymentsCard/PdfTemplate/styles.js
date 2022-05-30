import { StyleSheet, Font } from '@react-pdf/renderer'
import LatoRegular from 'assets/fonts/Lato-Regular.ttf'
import LatoBold from 'assets/fonts/Lato-Bold.ttf'

import NunitoSansRegular from 'assets/fonts/NunitoSans-Regular.ttf'
import NunitoSansBold from 'assets/fonts/NunitoSans-Bold.ttf'

Font.register({
  family: 'Lato',
  format: 'truetype',
  fonts: [{ src: LatoRegular }, { src: LatoBold, fontWeight: 700 }],
})

Font.register({
  family: 'Nunito Sans',
  format: 'truetype',
  fonts: [{ src: NunitoSansRegular }, { src: NunitoSansBold, fontWeight: 700 }],
})

export const page = StyleSheet.create({
  backgroundColor: '#FAFAFA',
  padding: '36px 0px 16px 0px',
  fontFamily: 'Nunito Sans',
})

export const section = StyleSheet.create({
  margin: '0px 64px',
  fontFamily: 'Nunito Sans',
})
