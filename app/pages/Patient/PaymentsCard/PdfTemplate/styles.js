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

export const page = (theme) =>
  StyleSheet.create({
    fontFamily: 'Nunito Sans',
    color: theme.palette.common.black,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(4, 0, 2, 0),
    fontSize: 12,
  })

export const section = (theme) =>
  StyleSheet.create({
    margin: theme.spacing(0, 8, 8, 8),
  })

export const title = (theme) =>
  StyleSheet.create({
    ...theme.typography.title1,
    fontSize: 20,
    letterSpacing: 0.3,
    marginBottom: theme.spacing(2),
  })

export const flexContainer = (opts = {}) =>
  StyleSheet.create({
    display: 'flex',
    flexDirection: 'row',
    ...opts,
  })

export const category = (theme) =>
  StyleSheet.create({
    marginRight: theme.spacing(4),
  })

export const categoryTitle = (theme) =>
  StyleSheet.create({
    color: theme.palette.grey.dark,
    marginBottom: theme.spacing(1),
  })

export const row = (theme, status) =>
  StyleSheet.create({
    marginBottom: theme.spacing(1),
    ...(status === 'owing' && { color: theme.palette.error.dark }),
    ...(status === 'forgiven' && { color: theme.palette.grey.dark }),
  })

export const rowItem = () =>
  StyleSheet.create({
    flex: 1,
  })
