import { takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import { loadLanguagesSaga } from './language';
import { loadDictionarySaga } from './dictionary';

export function* watchLanguage() {
  yield takeEvery(actionTypes.LOAD_LANGUAGES, loadLanguagesSaga);
}

export function* watchDictionary() {
  yield takeEvery(actionTypes.LOAD_DICTIONARY, loadDictionarySaga);
};