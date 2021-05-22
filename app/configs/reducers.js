import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import patientsReducer from "providers/Patients/reducer";

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    patients: patientsReducer,
  });

export default createRootReducer;
