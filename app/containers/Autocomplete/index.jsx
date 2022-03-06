import React, { useState } from 'react'
import useAsyncEffect from 'use-async-effect'

import AutocompleteComponent from 'components/AutocompleteComponent'

const Autocomplete = ({ className, callFn, value, onChange }) => {
  const [options, setOptions] = useState([])
  const [loading, setLoading] = useState(false)

  useAsyncEffect(
    async (isMounted) => {
      setLoading(true)
      const data = await callFn()

      if (!isMounted()) {
        return
      }

      setOptions(data)
      setLoading(false)
    },
    [value]
  )

  return (
    <AutocompleteComponent
      className={className}
      value={value}
      onChange={onChange}
      options={options}
      isLoading={loading}
    />
  )
}

export default Autocomplete
