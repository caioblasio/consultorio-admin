import { db } from 'configs/firebase'
import {
  collection,
  getDocs,
  getDoc,
  query,
  where,
  addDoc,
  serverTimestamp,
  setDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore'
import { patientMapper } from './utils'

const COLLECTION_NAME = 'patients'

export const fetchAllPatients = async () => {
  const q = query(collection(db, COLLECTION_NAME))
  const snapshot = await getDocs(q)
  return snapshot.docs.map(patientMapper)
}

export const fetchPatientById = async (id) => {
  const docRef = doc(db, COLLECTION_NAME, id)
  const snapshot = await getDoc(docRef)

  return snapshot.exists() ? patientMapper(snapshot) : null
}

export const fetchActivePatients = async () => {
  const q = query(
    collection(db, COLLECTION_NAME),
    where('isActive', '==', true)
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map(patientMapper)
}

export const fetchActivePatientsCount = async () => {
  const q = query(
    collection(db, COLLECTION_NAME),
    where('isActive', '==', true)
  )
  const snapshot = await getDocs(q)
  return snapshot.size
}

export const fetchPatientsCountWithinDateRangeByTreatmentBeginDate = async (
  startDate,
  endDate
) => {
  const q = query(
    collection(db, COLLECTION_NAME),
    where('treatmentBegin', '>=', startDate),
    where('treatmentBegin', '<=', endDate)
  )
  const snapshot = await getDocs(q)
  return snapshot.size
}

export const createPatient = async (patient) => {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), {
    ...patient,
    createdAt: serverTimestamp(),
  })
  const snapshot = await getDoc(docRef)
  return snapshot.exists() ? patientMapper(snapshot) : null
}

export const editPatient = async (patient) => {
  const { id, ...rest } = patient
  const docRef = doc(collection(db, COLLECTION_NAME), id)
  await setDoc(docRef, rest)
  const snapshot = await getDoc(docRef)
  return snapshot.exists() ? snapshot.id : null
}
