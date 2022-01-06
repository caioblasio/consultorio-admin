import { db } from 'configs/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { fetchActivePatients } from '../Patient'

const COLLECTION_NAME = 'payments'

export const fetchPaymentsWithinRange = async (startDate, endDate) => {
  const q = query(
    collection(db, COLLECTION_NAME),
    where('reference', '>=', startDate),
    where('reference', '<=', endDate)
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => doc.data())
}

export const fetchMissingPaymentsWithinRange = async (startDate, endDate) => {
  const activePatients = await fetchActivePatients()
  const currentMonthAndYearPayments = await fetchPaymentsWithinRange(
    startDate,
    endDate
  )
  return activePatients.length - currentMonthAndYearPayments.length
}
