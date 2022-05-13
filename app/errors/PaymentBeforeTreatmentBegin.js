class PaymentBeforeTreatmentBeginError extends Error {
  constructor(
    paymentData,
    message = 'Mês de Referência do pagamento é menor do que do mês de início do tratamento do paciente'
  ) {
    super(message)
    this.name = 'PaymentBeforeTreatmentBeginError'
    this.paymentData = paymentData
  }
}

export default PaymentBeforeTreatmentBeginError
