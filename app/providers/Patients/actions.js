import { FETCH_PATIENTS, FETCH_PATIENTS_SUCCESS } from "./constants";

export function fetchPatients() {
  return {
    type: FETCH_PATIENTS,
  };
}

export function fetchPatientsSuccess(data = []) {
  return {
    type: FETCH_PATIENTS_SUCCESS,
    payload: data,
  };
}
