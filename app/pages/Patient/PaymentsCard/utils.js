export const filterByYear = (payments, year) => {
  return year
    ? payments.filter(({ reference }) => reference.getYear() === year)
    : [...payments]
}

export const getTotal = (payments, year) => {
  const paymentsYearly = filterByYear(payments, year)

  return paymentsYearly.reduce(
    ({ value: value1 }, { value: value2 }) => value1 + value2
  )
}
