import { all } from "redux-saga/effects";
import patientsSaga from "providers/Patients/saga";

export default function* () {
  yield all([patientsSaga()]);
}
