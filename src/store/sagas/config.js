import { call, put } from 'redux-saga/effects';

import { config, keys } from '../../config/localConfig';
import * as actions from '../actions';

export function* loadConfigSaga() {
  const selectedLanguage = yield call(config.get, keys.SELECTED_LANGUAGE);
  if (selectedLanguage) {
    const { code, name } = selectedLanguage;
    yield put(actions.setSelectedLanguage(code, name));
  }
}