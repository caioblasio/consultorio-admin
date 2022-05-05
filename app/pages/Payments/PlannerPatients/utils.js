export const paymentMapper = (
  {
    patientId,
    holderId,
    status,
    reference,
    type,
    madeAt,
    createdAt,
    id,
    value,
  },
  holders
) => {
  const holder = holders.find(({ id }) => id === holderId)

  return {
    id,
    rowId: patientId,
    columnId: reference,
    status,
    data: {
      type,
      madeAt,
      createdAt,
      holder: holder ? holder.name : '',
      value,
    },
  }
}
