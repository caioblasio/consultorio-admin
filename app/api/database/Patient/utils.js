export const patientUiMapper = (doc) => {
  const { createdAt, ...rest } = doc.data()
  return { ...rest, createdAt: createdAt.toDate(), id: doc.id }
}

export const patientApiMapper = (patient) => {
  return { ...patient }
}
