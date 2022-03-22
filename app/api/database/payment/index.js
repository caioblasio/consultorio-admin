import { db } from 'configs/firebase'
import {
  collection,
  getDocs,
  query,
  doc,
  deleteDoc,
  where,
  addDoc,
  setDoc,
  getDoc,
  serverTimestamp,
} from 'firebase/firestore'
import { fetchActivePatients } from 'api/database'
import { paymentUiMapper, paymentApiMapper } from './utils'

const COLLECTION_NAME = 'payments'

export const fetchAllPayments = async () => {
  const q = query(collection(db, COLLECTION_NAME))
  const snapshot = await getDocs(q)
  return snapshot.docs.map(paymentUiMapper)
}

export const fetchPaymentsWithinRange = async (startDate, endDate) => {
  const q = query(
    collection(db, COLLECTION_NAME),
    where('reference', '>=', startDate),
    where('reference', '<=', endDate)
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map(paymentUiMapper)
}

export const fetchPaymentsWithinRangeByPatient = async (
  patientId,
  startDate,
  endDate
) => {
  const q = query(
    collection(db, COLLECTION_NAME),
    where('patientId', '==', patientId),
    where('reference', '>=', startDate),
    where('reference', '<=', endDate)
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map(paymentUiMapper)
}

export const fetchMissingPaymentsWithinRange = async (startDate, endDate) => {
  const activePatients = await fetchActivePatients()
  const currentMonthAndYearPayments = await fetchPaymentsWithinRange(
    startDate,
    endDate
  )
  return activePatients.length - currentMonthAndYearPayments.length
}

export const createPayment = async (payment) => {
  const docRef = await addDoc(
    collection(db, COLLECTION_NAME),
    paymentApiMapper({
      ...payment,
      createdAt: serverTimestamp(),
    })
  )
  const snapshot = await getDoc(docRef)
  return snapshot.exists() ? snapshot.id : null
}

export const editPayment = async (payment) => {
  const id = payment.id
  const docRef = doc(collection(db, COLLECTION_NAME), id)
  await setDoc(docRef, paymentApiMapper(payment))
  const snapshot = await getDoc(docRef)
  return snapshot.exists() ? snapshot.id : null
}

export const deletePayment = async (id) => {
  const docRef = doc(collection(db, COLLECTION_NAME), id)
  const snapshot = await getDoc(docRef)
  await deleteDoc(docRef)
  return snapshot.exists() ? snapshot.id : null
}
