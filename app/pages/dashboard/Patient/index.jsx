import React, { useEffect } from "react";
import Dashboard from "pages/dashboard";
import { useDispatch, useSelector } from "react-redux";
import { PatientActions, PatientSelectors } from "providers";

const Patient = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(PatientActions.fetchPatients());
  }, []);

  const patients = useSelector(PatientSelectors.getPatients());

  return (
    <Dashboard title="Pacientes">
      <div>
        {patients.map((patient) => (
          <div key={patient.id}>{patient.name}</div>
        ))}
      </div>
    </Dashboard>
  );
};

export default Patient;
