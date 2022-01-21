import { createTheme } from '@mui/material/styles'
import palette from './colors'
import typography from './typography'
import components from './components'
import shape from './shapes'

const theme = createTheme({
  palette,
  typography,
  components,
  shape,
})

export default theme
