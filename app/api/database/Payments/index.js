import { db } from 'configs/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { fetchActivePatients } from 'api/database/Patient'

const COLLECTION_NAME = 'payments'

export const fetchAllPayments = async () => {
  const q = query(collection(db, COLLECTION_NAME))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => {
    const { createdAt, reference, ...rest } = doc.data()
    return {
      ...rest,
      createdAt: createdAt.toDate(),
      reference: reference.toDate(),
    }
  })
}

export const fetchPaymentsWithinRange = async (startDate, endDate) => {
  const q = query(
    collection(db, COLLECTION_NAME),
    where('reference', '>=', startDate),
    where('reference', '<=', endDate)
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => {
    const { createdAt, reference, ...rest } = doc.data()
    return {
      ...rest,
      createdAt: createdAt.toDate(),
      reference: reference.toDate(),
    }
  })
}

export const fetchMissingPaymentsWithinRange = async (startDate, endDate) => {
  const activePatients = await fetchActivePatients()
  const currentMonthAndYearPayments = await fetchPaymentsWithinRange(
    startDate,
    endDate
  )
  return activePatients.length - currentMonthAndYearPayments.length
}
