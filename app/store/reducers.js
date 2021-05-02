import { combineReducers } from 'redux';
import starWarsReducer from 'providers/StarWars/reducer';

export default combineReducers({
  starWars: starWarsReducer,
});
