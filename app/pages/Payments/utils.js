export const paymentMapper = ({
  patientId,
  status,
  reference,
  type,
  holder,
  madeAt,
  createdAt,
  id,
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
  },
})
