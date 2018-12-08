import { put, call, select } from 'redux-saga/effects';

import { loadDictionary } from '../../async/dictionary';
import * as actions from '../actions/';

export function* loadDictionarySaga() {
  const languageCode = yield select(store => store.language.selectedLanguage.code);
  const dictionary = yield call(loadDictionary, languageCode);
  yield put(actions.setDictionary(dictionary));
}