import { signInWithEmailAndPassword as firebase_signInWithEmailAndPassword } from 'firebase/auth'

export const signInWithEmailAndPassword = (auth, email, password) =>
  firebase_signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user
      return Promise.resolve({ user })
    })
    .catch((error) => {
      return Promise.reject(error)
    })
