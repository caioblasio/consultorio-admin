import { db } from 'configs/firebase'
import {
  collection,
  getDocs,
  getDoc,
  query,
  where,
  addDoc,
  serverTimestamp,
  doc,
} from 'firebase/firestore'
import { holderMapper } from './utils'

const COLLECTION_NAME = 'holders'

export const fetchAllHolders = async () => {
  const q = query(collection(db, COLLECTION_NAME))
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
