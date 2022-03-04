import React, { useMemo, useContext } from 'react'
import { capitalize } from 'lodash-es'

import { DateContext } from 'contexts/Date'
import SelectField from 'components/SelectField'

const MonthsField = (props) => {
  const adapter = useContext(DateContext)
  const options = useMemo(() => {
    const newOptions = []
    const newDate = new Date()
    for (let i = 0; i < 12; i++) {
      newDate.setMonth(i)
      newOptions.push({
        label: capitalize(adapter.format(newDate, 'MMMM')),
        value: i + 1,
      })
    }

    return newOptions
  }, [])
  return <SelectField {...props} options={options} />
}

export default MonthsField
