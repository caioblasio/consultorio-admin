import { db } from 'configs/firebase'
import {
  collection,
  getDocs,
  getDoc,
  query,
  setDoc,
  addDoc,
  serverTimestamp,
  doc,
  where,
  deleteDoc,
} from 'firebase/firestore'
import { holderMapper } from './utils'

const COLLECTION_NAME = 'holders'

export const fetchAllHolders = async () => {
  const q = query(collection(db, COLLECTION_NAME))
  const snapshot = await getDocs(q)
  return snapshot.docs.map(holderMapper)
}

export const fetchHolderById = async (id) => {
  const docRef = doc(db, COLLECTION_NAME, id)
  const snapshot = await getDoc(docRef)

  return snapshot.exists() ? holderMapper(snapshot) : null
}

export const fetchAllActiveHolders = async () => {
  const q = query(
    collection(db, COLLECTION_NAME),
    where('isActive', '==', true)
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map(holderMapper)
}

export const createHolder = async (holder) => {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), {
    ...holder,
    createdAt: serverTimestamp(),
  })
  const snapshot = await getDoc(docRef)
  return snapshot.exists() ? snapshot.id : null
}

export const editHolder = async (holder) => {
  const { id, ...rest } = holder
  const docRef = doc(collection(db, COLLECTION_NAME), id)
  await setDoc(docRef, rest)
  const snapshot = await getDoc(docRef)
  return snapshot.exists() ? snapshot.id : null
}

export const deleteHolder = async (id) => {
  const docRef = doc(collection(db, COLLECTION_NAME), id)
  const snapshot = await getDoc(docRef)
  await deleteDoc(docRef)
  return snapshot.exists() ? snapshot.id : null
}
