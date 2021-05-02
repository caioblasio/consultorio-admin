import { createSelector } from "reselect";
import { initialState } from "./reducer";

const selectState = ({ patients }) => patients || initialState;

const getPatients = () =>
  createSelector(selectState, (state) =>
    state
      .get("data")
      .map((entry) => ({
        id: entry.get("id"),
      }))
      .toJS()
  );

const getPatient = (id) => {
  return createSelector(
    getPatients(),
    (data) => data.filter((entry) => entry.id === id)[0]
  );
};

export { getPatients, getPatients };
