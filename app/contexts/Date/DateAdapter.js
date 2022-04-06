import MuiDateAdapter from '@mui/lab/AdapterDateFns'
import { formatDistance as DateFnsFormatDistance } from 'date-fns'

class DateAdapter extends MuiDateAdapter {
  formatDistance(date, baseDate, options) {
    return DateFnsFormatDistance(date, baseDate, {
      ...options,
      locale: this.locale,
    })
  }
}

export default DateAdapter
