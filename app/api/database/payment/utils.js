export const paymentMapper = (doc) => {
  const { createdAt, reference, madeAt, ...rest } = doc.data()
  return {
    ...rest,
    id: doc.id,
    createdAt: createdAt.toDate(),
    reference: reference.toDate(),
    madeAt: madeAt.toDate(),
  }
}
