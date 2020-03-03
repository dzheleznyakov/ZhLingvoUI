import { put, call, select } from 'redux-saga/effects';
import _ from 'lodash';

import { loadDictionary, loadPartsOfSpeech } from '../../async/dictionary';
import { fetchWord, saveWord } from '../../async/word';
import * as actions from '../actions/';
import axios from '../../async/axios-api';

export function* loadDictionarySaga() {
  const languageCode = yield select(store => store.language.selectedLanguage.code);
  const dictionary = yield call(loadDictionary, languageCode);
  yield put(actions.setDictionary(dictionary));
}

export function* loadLanguageConstantsSaga() {
  const languageCode = yield select(store => store.language.selectedLanguage.code);
  const languageConstants = yield call(loadPartsOfSpeech, languageCode);
  yield put(actions.storeLanguageConstants(languageConstants));
}

export function* fetchWordSaga(action) {
  const { id } = action;
  const languageCode = yield select(store => _.get(store, 'language.selectedLanguage.code'));
  const word = yield call(fetchWord, id, languageCode);
  yield put(actions.setFetchedWord(word));
}

export function* saveWordSaga(action) {
  const { wordEntry } = action;
  const languageCode = yield select(store => _.get(store, 'language.selectedLanguage.code'));
  const upatedWordEntry = yield call(saveWord, wordEntry, languageCode);
  yield put(actions.setFetchedWord(upatedWordEntry));
}

export function* getFetchedWordFormsSaga(action) {
  const { pos } = action;
  const languageCode = yield select(store => _.get(store, 'language.selectedLanguage.code'));
  const wordId = yield select(store => _.get(store, 'dictionary.fetchedWord.id'));
  try {
    const { data } = yield call(axios.get, `/words/forms/${languageCode}/${pos}/${wordId}`);
    if (data) yield put(actions.setFetchedWordForms(data));
  } catch (error) {
    console.log(error); // TODO
  }
}

export function* updateWordFormsSaga(action) {
  const { pos, forms } = action;
  const languageCode = yield select(store => _.get(store, 'language.selectedLanguage.code'));
  const wordId = yield select(store => _.get(store, 'dictionary.fetchedWord.id'));
  try {
    const { data } = yield call(axios.put, `/words/forms/${languageCode}/${pos}/${wordId}`, forms);
    if (data) yield put(actions.setFetchedWordForms(data));
  } catch (error) {
    console.log(error); // TODO
  }
}
