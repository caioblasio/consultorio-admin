import { db } from 'configs/firebase'
import { collection, getDocs } from 'firebase/firestore'

const COLLECTION_NAME = 'patients'

export function* fetchPatients() {
  let result = []
  const patients = db.collection(COLLECTION_NAME)
  const data = yield patients.get()
  data.docs.forEach((patient) => {
    result = [...result, patient.data()]
  })
  return result
}

export const fetchPatientsCount = async () => {
  const querySnapshot = await getDocs(collection(db, COLLECTION_NAME))
  console.log(querySnapshot)
  return querySnapshot.size
}
