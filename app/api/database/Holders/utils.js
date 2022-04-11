export const holderMapper = (doc) => {
  const { createdAt, ...rest } = doc.data()
  return {
    ...rest,
    createdAt: createdAt.toDate(),
    id: doc.id,
  }
}
