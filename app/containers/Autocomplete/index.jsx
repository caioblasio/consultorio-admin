import React, { useState } from 'react'
import useAsyncEffect from 'use-async-effect'

import AutocompleteComponent from 'components/AutocompleteComponent'

const Autocomplete = ({ callFn, value, ...rest }) => {
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
      value={value}
      options={options}
      isLoading={loading}
      {...rest}
    />
  )
}

export default Autocomplete
