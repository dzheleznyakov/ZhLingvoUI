import { put, call, select } from 'redux-saga/effects';

import axios from '../../async/axios-api';
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

export function* fetchChangeModelSaga(action) {
  const { pos } = action;
  const languageCode = yield select(store => store.language.selectedLanguage.code);
  let changeModel;
  try {
    const response = yield call(axios.get, `/words/forms/models/${languageCode}/${pos}`);
    changeModel = response.data;
  } catch (error) {
    changeModel = {};
  }
  yield put(actions.setChangeModel(pos, changeModel));
}