import { put, call } from 'redux-saga/effects';

import * as actions from '../actions/';
import { loadLanguagesFromServer } from '../../async/language';

export function* loadLanguagesSaga() {
  const languages = yield call(loadLanguagesFromServer);
  yield put(actions.setLanguages(languages));
  yield put(actions.removeDictionary());
}