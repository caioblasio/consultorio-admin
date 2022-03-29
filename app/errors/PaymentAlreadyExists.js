class PaymentAlreadyExistsError extends Error {
  constructor(
    paymentData,
    message = 'There is already a payment for this patient for the month'
  ) {
    super(message)
    this.name = 'PaymentAlreadyExistsError'
    this.paymentData = paymentData
  }
}

export default PaymentAlreadyExistsError
