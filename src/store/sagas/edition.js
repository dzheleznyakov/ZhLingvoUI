import { put, call, select } from 'redux-saga/effects';

import * as actions from '../actions/';
import axios from '../../async/axios-api';

const POST = 'post';
const PUT = 'put';
const DELETE = 'delete';

const CONTENT_TYPE_APPLICATION_JSON = { 'Content-Type': 'application/json' };

function* updateWordSaga(method, url, payload, headers = {}) {
  const languageCode = yield select(store => store.language.selectedLanguage.code);
  const wordId = yield select(store => store.dictionary.fetchedWord.id);
  const textAxiosConfig = { headers: { 'Content-Type': 'text/plain', ...headers } };
  const response = yield call(axios[method], url(languageCode, wordId), payload, textAxiosConfig)
  const updatedWord = response.data;
  yield put(actions.setFetchedWord(updatedWord));
}

export function* editWordNameSaga(action) {
  const { wordName } = action;
  yield* updateWordSaga(PUT, (lang, id) => `/words/${lang}/${id}/name`, wordName);
  const selectedWordIndex = yield select(store => store.dictionary.selectedWordIndex);
  yield put(actions.setWordName(wordName, selectedWordIndex));
}

export function* createTranscriptionSaga(action) {
  yield* updateWordSaga(POST, (lang, id) => `/words/${lang}/${id}/transcription`, action.transcription);
}

export function* editTranscriptionSaga(action) {
  const { transcription, index } = action;
  const url = (lang, id) => `/words/${lang}/${id}/transcription/${index}`;
  if (transcription)
    yield* updateWordSaga(PUT, url, transcription);
  else
    yield* updateWordSaga(DELETE, url);
}

export function* createSemanticBlockSaga() {
  yield* updateWordSaga(POST, (lang, id) => `/words/${lang}/${id}/semanticBlock/`);
}

export function* deleteSemanticBlockSaga(action) {
  yield* updateWordSaga(DELETE, (lang, id) => `/words/${lang}/${id}/semanticBlock/${action.index}`);
}

export function* createPartOfSpeechSaga(action) {
  const { semanticBlockIndex, partOfSpeech } = action;
  yield* updateWordSaga(POST,
    (lang, id) => `/words/${lang}/${id}/partOfSpeechBlock/${semanticBlockIndex}`, partOfSpeech);
}

export function* deletePartOfSpeech(action) {
  const { semanticBlockIndex, partOfSpeech } = action;
  const url = (lang, id) => `/words/${lang}/${id}/partOfSpeechBlock/${semanticBlockIndex}/${partOfSpeech}`;
  yield* updateWordSaga(DELETE, url);
}

export function* createMeaningSaga(action) {
  const { sbIndex, posIndex } = action.branch;
  const { translation } = action;
  const url = (lang, id) => `/words/${lang}/${id}/meaning/${sbIndex}/${posIndex}`;
  yield* updateWordSaga(POST, url, translation);
}

export function* editMeaningRemarkSaga(action) {
  const { sbIndex, posIndex, mIndex } = action.branch;
  const { remark } = action;
  const payload = { data: remark };
  const url = (lang, id) => `/words/${lang}/${id}/meaning/${sbIndex}/${posIndex}/remark/${mIndex}`;
  yield* updateWordSaga(PUT, url, payload, CONTENT_TYPE_APPLICATION_JSON );
}

export function* editTranslationSaga(action) {
  const { sbIndex, posIndex, mIndex } = action.branch;
  const { index, translation } = action;
  const url = (lang, id) => `/words/${lang}/${id}/meaning/${sbIndex}/${posIndex}/${mIndex}/translation/${index}`;
  const payload = { data: translation };
  yield* updateWordSaga(PUT, url, payload, CONTENT_TYPE_APPLICATION_JSON);
}

export function* editElaborationSaga(action) {
  const { sbIndex, posIndex, mIndex } = action.branch;
  const { index, elaboration } = action;
  const url = (lang, id) => `/words/${lang}/${id}/meaning/${sbIndex}/${posIndex}/${mIndex}/elaboration/${index}`
  const payload = { data: elaboration };
  yield* updateWordSaga(PUT, url, payload, CONTENT_TYPE_APPLICATION_JSON);
}

export function* editExampleExpressionSaga(action) {
  const { sbIndex, posIndex, mIndex } = action.branch;
  const { index, expression } = action;
  const url = (lang, id) => `/words/${lang}/${id}/${sbIndex}/${posIndex}/${mIndex}/example/${index}/expression`;
  const payload = { data: expression };
  yield* updateWordSaga(PUT, url, payload, CONTENT_TYPE_APPLICATION_JSON);
}

export function* editExampleExplanationSaga(action) {
  const { sbIndex, posIndex, mIndex } = action.branch;
  const { index, explanation } = action;
  const url = (lang, id) => `/words/${lang}/${id}/${sbIndex}/${posIndex}/${mIndex}/example/${index}/explanation`;
  const payload = { data: explanation };
  yield* updateWordSaga(PUT, url, payload, CONTENT_TYPE_APPLICATION_JSON);
}

export function* editExampleRemarkSaga(action) {
  const { sbIndex, posIndex, mIndex } = action.branch;
  const { index, remark } = action;
  const url = (lang, id) => `/words/${lang}/${id}/${sbIndex}/${posIndex}/${mIndex}/example/${index}/remark`;
  const payload = { data: remark };
  yield* updateWordSaga(PUT, url, payload, CONTENT_TYPE_APPLICATION_JSON);
}

export function* createWordSaga(action) {
  const { wordName } = action;
  if (wordName && wordName.trim().length) {
    const lang = yield select(store => store.language.selectedLanguage.code);
    const id = (yield call(axios.post, `/words/${lang}`, { data: wordName })).data;
    yield put(actions.loadDictionary());
    yield put(actions.setWord({ id, word: wordName }));
    const selectedWordIndex = yield select(store => store.dictionary.selectedWordIndex);
    yield put(actions.selectWord(selectedWordIndex));
    yield put(actions.fetchWord(id));
  }
}

export function* removeWordSaga() {
  const lang = yield select(store => store.language.selectedLanguage.code);
  let wordId = yield select(store => store.dictionary.fetchedWord.id);
  yield call(axios[DELETE], `/words/${lang}/${wordId}`);
  yield put(actions.removeWordFromList());
  const selectedWordIndex = yield select(store => store.dictionary.selectedWordIndex);  
  const selectedWordId = yield select(store => store.dictionary.loadedDictionary[selectedWordIndex].id);
  yield put(actions.fetchWord(selectedWordId));
}
