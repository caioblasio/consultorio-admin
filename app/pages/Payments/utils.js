export const paymentReferenceMapper = (
  { patientId, status, reference, type, madeAt, createdAt, id, value },
  patients,
  holders
) => {
  const patient = patients.find(({ id }) => id === patientId)
  const holder = holders.find(({ id }) => id === patient?.holderId)

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
