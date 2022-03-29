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
import { paymentMapper } from './utils'
import PaymentAlreadyExistsError from 'errors/PaymentAlreadyExists'

const COLLECTION_NAME = 'payments'

export const fetchAllPayments = async () => {
  const q = query(collection(db, COLLECTION_NAME))
  const snapshot = await getDocs(q)
  return snapshot.docs.map(paymentMapper)
}

export const fetchPaymentsWithinRange = async (startDate, endDate) => {
  const q = query(
    collection(db, COLLECTION_NAME),
    where('reference', '>=', startDate),
    where('reference', '<=', endDate)
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map(paymentMapper)
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
  return snapshot.docs.map(paymentMapper)
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
  const { patientId, reference } = payment
  const existingPayments = await fetchPaymentsWithinRangeByPatient(
    patientId,
    reference,
    reference
  )

  if (existingPayments.length) {
    const existingPayment = existingPayments[0]
    throw new PaymentAlreadyExistsError({
      id: existingPayment.id,
      createdAt: existingPayment.createdAt,
    })
  }

  const docRef = await addDoc(collection(db, COLLECTION_NAME), {
    ...payment,
    createdAt: serverTimestamp(),
  })
  const snapshot = await getDoc(docRef)
  return snapshot.exists() ? snapshot.id : null
}

export const editPayment = async (payment) => {
  const { id, ...rest } = payment
  const docRef = doc(collection(db, COLLECTION_NAME), id)
  await setDoc(docRef, rest)
  const snapshot = await getDoc(docRef)
  return snapshot.exists() ? snapshot.id : null
}

export const deletePayment = async (id) => {
  const docRef = doc(collection(db, COLLECTION_NAME), id)
  const snapshot = await getDoc(docRef)
  await deleteDoc(docRef)
  return snapshot.exists() ? snapshot.id : null
}
