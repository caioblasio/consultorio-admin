import React from 'react'

import Loading from 'assets/svg/loading_dots.svg'

const Loader = ({ className, size = 'medium' }) => (
  <img
    src={Loading}
    width={size === 'medium' ? 48 : 32}
    className={className}
  />
)

export default Loader
