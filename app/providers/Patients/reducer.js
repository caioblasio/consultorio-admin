import { fromJS } from "immutable";
import { FETCH_PATIENTS_SUCCESS } from "./constants";

export const initialState = fromJS({
  data: [],
});

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_PATIENTS_SUCCESS:
      return state.set("data", fromJS(payload));

    default:
      return state;
  }
};

export default reducer;
