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

const COLLECTION_NAME = 'patients'

export const fetchAllPatients = async () => {
  const q = query(collection(db, COLLECTION_NAME))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
}

export const fetchPatientById = async (id) => {
  const docRef = doc(db, COLLECTION_NAME, id)
  const snapshot = await getDoc(docRef)

  return snapshot.exists() ? { ...snapshot.data(), id: snapshot.id } : null
}

export const fetchActivePatients = async () => {
  const q = query(
    collection(db, COLLECTION_NAME),
    where('isActive', '==', true)
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => doc.data())
}

export const fetchPatientsCount = async () => {
  const querySnapshot = await getDocs(collection(db, COLLECTION_NAME))
  return querySnapshot.size
}

export const fetchPatientsWithinDateRange = async (startDate, endDate) => {
  const q = query(
    collection(db, COLLECTION_NAME),
    where('createdAt', '>=', startDate),
    where('createdAt', '<=', endDate)
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => doc.data())
}

export const createPatient = async (patient) => {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), {
    ...patient,
    createdAt: serverTimestamp(),
  })
  const snapshot = await getDoc(docRef)
  return snapshot.data()
}

export const editPatient = async (patient) => {
  const id = patient.id
  const docRef = doc(collection(db, COLLECTION_NAME), id)
  await setDoc(docRef, {
    ...patient,
  })
  const snapshot = await getDoc(docRef)
  return { ...snapshot.data(), id: snapshot.id }
}

export const deletePatient = async (id) => {
  const docRef = doc(collection(db, COLLECTION_NAME), id)
  const snapshot = await getDoc(docRef)
  await deleteDoc(docRef)
  return { ...snapshot.data(), id: snapshot.id }
}
