import { takeLatest, call, put } from "redux-saga/effects";
import { fetchPatients as fetchPatientsFromDB } from "api/database/Patient";
import { FETCH_PATIENTS } from "./constants";
import Actions from "./actions";

export function* fetchPatients() {
  try {
    const data = yield call(fetchPatientsFromDB);
    yield put(Actions.fetchPatientsSuccess(data));
  } catch (err) {
    console.error(err);
  }
}

function* saga() {
  yield takeLatest(FETCH_PATIENTS, fetchPatients);
}

export default saga;
