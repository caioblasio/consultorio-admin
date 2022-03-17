import { useContext } from 'react'
import { DateContext } from 'contexts/Date'

const useDateAdapter = () => {
  const { utils } = useContext(DateContext)
  return utils
}

export default useDateAdapter
