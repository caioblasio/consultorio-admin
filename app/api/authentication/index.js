import {
  getAuth,
  onAuthStateChanged as firebase_onAuthStateChanged,
  signOut as firebase_signOut,
} from 'firebase/auth'
import { signInWithPopup as _signInGoogle } from './google'

const signInGoogle = () => {
  return _signInGoogle()
}

const signOutGoogle = () => {
  return _signOutGoogle().then(() => _signOutFirebase())
}

const signOut = () => {
  const auth = getAuth()
  firebase_signOut(auth)
    .then(() => {
      Promise.resolve()
    })
    .catch((error) => {
      Promise.reject(error)
    })
}

const onAuthStateChanged = (callback) => {
  const auth = getAuth()
  firebase_onAuthStateChanged(auth, (user) => {
    callback(user)
  })
}

// const signOut = (provider) => {
//   let result
//   switch (provider) {
//     case 'google':
//       result = signOutGoogle()
//       break
//   }

//   if (!result) {
//     throw new Error(
//       `The provider ${provider} is not registered for authentication.`
//     )
//   }

//   return result
// }

export { signInGoogle as signIn, onAuthStateChanged, signOut }
