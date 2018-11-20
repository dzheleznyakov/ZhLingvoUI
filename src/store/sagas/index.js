import { takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import { loadLanguagesSaga } from './language';

export function* watchLanguage() {
  yield takeEvery(actionTypes.LOAD_LANGUAGES, loadLanguagesSaga);
}