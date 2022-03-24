export const paymentReferenceMapper = ({
  patientId,
  status,
  reference,
  type,
  holder,
  madeAt,
  createdAt,
  id,
  value,
}) => ({
  id,
  rowId: patientId,
  columnId: reference,
  status,
  data: {
    type,
    madeAt,
    createdAt,
    holder,
    value,
  },
})

export const paymentIncomeMapper = ({ patientId, madeAt, id, value }) => ({
  id,
  rowId: patientId,
  columnId: madeAt,
  data: {
    value,
  },
})
