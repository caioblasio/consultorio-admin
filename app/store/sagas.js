import { all } from 'redux-saga/effects';
import starWarsSaga from 'providers/StarWars/saga';

export default function*() {
  yield all([starWarsSaga()]);
}
