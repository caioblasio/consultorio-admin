export const getMonthDifference = (startDate, endDate) =>
  endDate.getMonth() -
  startDate.getMonth() +
  12 * (endDate.getFullYear() - startDate.getFullYear())

export const getCurrentMonthDateRange = () => {
  const now = new Date()
  const startDate = new Date(now.getFullYear(), now.getMonth())
  const endDate = new Date(now.getFullYear(), now.getMonth() + 1)

  return {
    startDate,
    endDate,
  }
}
