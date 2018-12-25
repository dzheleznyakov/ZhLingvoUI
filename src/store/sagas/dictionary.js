import { put, call, select } from 'redux-saga/effects';

import { loadDictionary, saveDictionary } from '../../async/dictionary';
import * as actions from '../actions/';

export function* loadDictionarySaga() {
  const languageCode = yield select(store => store.language.selectedLanguage.code);
  const dictionary = yield call(loadDictionary, languageCode);
  yield put(actions.setDictionary(dictionary));
}

function* saveDictionarySaga() {
  const languageCode = yield select(store => store.language.selectedLanguage.code);
  const dictionary = yield select(store => store.dictionary.loadedDictionary);
  yield saveDictionary(languageCode, dictionary);
}

export function* editWordNameSaga(action) {
  const wordName = action.wordName;
  const selectedWordIndex = yield select(store => store.dictionary.selectedWordIndex);
  yield put(actions.setWordName(wordName, selectedWordIndex));
  yield* saveDictionarySaga();
}

export function* editTranscriptionSaga(action) {
  const { transcription, index } = action;
  const selectedWordIndex = yield select(store => store.dictionary.selectedWordIndex);
  yield put(actions.setTranscription(transcription, index, selectedWordIndex));
}
