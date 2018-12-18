import { takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import { loadLanguagesSaga, selectLanguageSaga } from './language';
import { loadDictionarySaga } from './dictionary';
import { loadConfigSaga } from './config';

export function* watchLanguage() {
  yield takeEvery(actionTypes.LOAD_LANGUAGES, loadLanguagesSaga);
}

export function* watchDictionary() {
  yield takeEvery(actionTypes.LOAD_DICTIONARY, loadDictionarySaga);
  yield takeEvery(actionTypes.SELECT_LANGUAGE, selectLanguageSaga)
};

export function* watchConfig() {
  yield takeEvery(actionTypes.LOAD_CONFIG, loadConfigSaga);
}
