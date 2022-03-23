export const patientMapper = (doc) => {
  const { createdAt, ...rest } = doc.data()
  return { ...rest, createdAt: createdAt.toDate(), id: doc.id }
}
