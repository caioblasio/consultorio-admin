import React from 'react'

import Loading from 'assets/svg/loading.svg'

const Loader = ({ className }) => (
  <img src={Loading} width="48" className={className} />
)

export default Loader
