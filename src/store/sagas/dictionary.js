import { put, call, select } from 'redux-saga/effects';

import { loadDictionary, loadPartsOfSpeech } from '../../async/dictionary';
import { fetchWord, saveWord } from '../../async/word';
import * as actions from '../actions/';

export function* loadDictionarySaga() {
  const languageCode = yield select(store => store.language.selectedLanguage.code);
  const dictionary = yield call(loadDictionary, languageCode);
  yield put(actions.setDictionary(dictionary));
}

export function* loadPartsOfSpeechesSaga() {
  const languageCode = yield select(store => store.language.selectedLanguage.code);
  const partsOfSpeech = yield call(loadPartsOfSpeech, languageCode);
  yield put(actions.storePartsOfSpeech(partsOfSpeech));
}

export function* fetchWordSaga(action) {
  const { id } = action;
  const languageCode = yield select(store => store.language.selectedLanguage.code);
  const word = yield call(fetchWord, id, languageCode);
  yield put(actions.setFetchedWord(word));
}

export function* saveWordSaga(action) {
  const { wordEntry } = action;
  const languageCode = yield select(store => store.language.selectedLanguage.code);
  const upatedWordEntry = yield call(saveWord, wordEntry, languageCode);
  yield put(actions.setFetchedWord(upatedWordEntry));
}
