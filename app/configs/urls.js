export const loginURL = () => '/login'
export const homeURL = () => '/'
export const patientsURL = () => '/patients'
export const holdersURL = () => '/holders'
export const schedulesURL = () => '/schedules'
export const accountURL = () => '/account'
export const paymentsURL = () => '/payments'
export const patientURL = (patientId) =>
  `${patientsURL()}/${patientId ? patientId : ':patientId'}`

export const holderURL = (holderId) =>
  `${holdersURL()}/${holderId ? holderId : ':holderId'}`
