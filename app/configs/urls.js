export const loginURL = () => '/login'
export const homeURL = () => '/'
export const patientsURL = () => '/patients'
export const schedulesURL = () => '/schedules'
export const accountURL = () => '/account'
export const paymentsURL = () => '/payments'
export const patientURL = (patientId) =>
  `${patientsURL()}/${patientId ? patientId : ':patientId'}`
