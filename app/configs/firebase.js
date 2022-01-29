import { initializeApp } from 'firebase/app'
import { initializeFirestore } from 'firebase/firestore'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyBxHglKXsDG7jCyTC9Y3TdZFgIqFzRvcXQ',
  authDomain: 'consultorio-d3896.firebaseapp.com',
  projectId: 'consultorio-d3896',
  storageBucket: 'consultorio-d3896.appspot.com',
  messagingSenderId: '889336786169',
  appId: '1:889336786169:web:19779fd2cb0f7d39ff4628',
  measurementId: 'G-8TZGYVP3MZ',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = initializeFirestore(app, { experimentalForceLongPolling: true })

export { db }
