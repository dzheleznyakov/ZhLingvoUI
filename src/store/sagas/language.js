import { put, call } from 'redux-saga/effects';

import * as actions from '../actions/';
import { loadLanguagesFromServer } from '../../async/language';
import { config, keys } from '../../config/localConfig';

export function* loadLanguagesSaga() {
  const languages = yield call(loadLanguagesFromServer);
  yield put(actions.setLanguages(languages));
  yield put(actions.removeDictionary());
}

export function* selectLanguageSaga(action) {
  const { code, name } = action.language;
  yield put(actions.setSelectedLanguage(code, name));
  yield call(config.set, keys.SELECTED_LANGUAGE, action.language);
}