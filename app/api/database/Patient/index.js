import db from "configs/firebase";

export function* fetchPatients() {
  let result = [];
  const patients = db.collection("patients");
  const data = yield patients.get();
  data.docs.forEach((patient) => {
    result = [...result, patient.data()];
  });
  return result;
}
