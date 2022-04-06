export const patientMapper = (doc) => {
  const { createdAt, treatmentBegin, ...rest } = doc.data()
  return {
    ...rest,
    createdAt: createdAt.toDate(),
    treatmentBegin: treatmentBegin.toDate(),
    id: doc.id,
  }
}
