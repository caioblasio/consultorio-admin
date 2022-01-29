import { db } from 'configs/firebase'
import {
  collection,
  getDocs,
  getDoc,
  query,
  where,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore'

const COLLECTION_NAME = 'patients'

export const fetchAllPatients = async () => {
  const q = query(collection(db, COLLECTION_NAME))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
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
