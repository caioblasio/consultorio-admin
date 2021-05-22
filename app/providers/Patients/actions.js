import { FETCH_PATIENTS, FETCH_PATIENTS_SUCCESS } from "./constants";

function fetchPatients() {
  return {
    type: FETCH_PATIENTS,
  };
}

function fetchPatientsSuccess(data = []) {
  return {
    type: FETCH_PATIENTS_SUCCESS,
    payload: data,
  };
}

export default { fetchPatients, fetchPatientsSuccess };
