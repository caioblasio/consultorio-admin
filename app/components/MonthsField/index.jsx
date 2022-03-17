import React, { useMemo } from 'react'
import { capitalize } from 'lodash-es'
import useDateAdapter from 'hooks/useDateAdapter'
import SelectField from 'components/SelectField'

const MonthsField = (props) => {
  const adapter = useDateAdapter()
  const options = useMemo(() => {
    const newOptions = []
    const newDate = new Date()
    for (let i = 0; i < 12; i++) {
      newDate.setMonth(i)
      newOptions.push({
        label: capitalize(adapter.format(newDate, 'month')),
        value: i + 1,
      })
    }

    return newOptions
  }, [])
  return <SelectField {...props} options={options} />
}

export default MonthsField
