import { takeLatest, call, put } from "redux-saga/effects";
// import fetchData from "utils/fetch";
import { FETCH_PATIENTS } from "./constants";
import { fetchPatientsSuccess } from "./actions";

export function* fetchPatients() {
  try {
    // const data = yield call(fetchData);
    yield put(fetchPatientsSuccess(data));
  } catch (err) {
    console.error(err);
  }
}

function* saga() {
  yield takeLatest(FETCH_PATIENTS, fetchPatients);
}

export default saga;
