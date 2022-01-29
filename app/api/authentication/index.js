import {
  getAuth,
  onAuthStateChanged as firebase_onAuthStateChanged,
  signOut as firebase_signOut,
} from 'firebase/auth'
import { signInWithEmailAndPassword } from './emailAndPassword'

const signOut = async () => {
  const auth = getAuth()
  try {
    return await firebase_signOut(auth)
  } catch (error) {
    throw error
  }
}

const onAuthStateChanged = (callback) => {
  const auth = getAuth()
  firebase_onAuthStateChanged(auth, (user) => {
    callback(user)
  })
}

const signIn = (credentials, provider = 'emailAndPassword') => {
  const auth = getAuth()
  const { email, password } = credentials

  const providers = {
    emailAndPassword: signInWithEmailAndPassword(auth, email, password),
  }

  const signInMethod = providers[provider]

  if (!signInMethod) {
    throw new Error(
      `The provider ${provider} is not registered for authentication.`
    )
  }

  return signInMethod
}

export { signIn, onAuthStateChanged, signOut }
