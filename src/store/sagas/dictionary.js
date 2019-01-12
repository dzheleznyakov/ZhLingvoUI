import { put, call, select } from 'redux-saga/effects';

import { 
  loadDictionary, 
  saveDictionary, 
  loadPartsOfSpeech,
} from '../../async/dictionary';
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
  if (transcription) {
    yield put(actions.setTranscription(transcription, index, selectedWordIndex));
  } else {
    yield put(actions.deleteTranscription(index, selectedWordIndex));
  }
  yield* saveDictionarySaga();
}

export function* createSemanticBlockSaga() {
  const selectedWordIndex = yield select(store => store.dictionary.selectedWordIndex);
  yield put(actions.addSemanticBlock(selectedWordIndex));
  yield* saveDictionarySaga();
}

export function* removeSemanticBlockAndSaveDictionarySaga(action) {
  const { index } = action;
  const selectedWordIndex = yield select(store => store.dictionary.selectedWordIndex);
  const word = yield select(store => store.dictionary.loadedDictionary[selectedWordIndex]);
  const semanticBlock = word.semanticBlocks[index];
  if (!semanticBlock || semanticBlock.length === 0) {
    yield put(actions.deleteSemanticBlock(index, selectedWordIndex));
    yield* saveDictionarySaga();
  }
}

export function* addPartOfSpeechSaga(action) {
  const selectedWordIndex = yield select(store => store.dictionary.selectedWordIndex);
  const { semanticBlockIndex, partOfSpeech } = action;
  yield put(actions.setPartOfSpeech(selectedWordIndex, semanticBlockIndex, partOfSpeech));
  yield* saveDictionarySaga();
}

export function* removePartOfSpeechAndSaveDicitonarySaga(action) {
  const { semanticBlockIndex, partOfSpeech } = action;
  const selectedWordIndex = yield select(store => store.dictionary.selectedWordIndex);
  const word = yield select(store => store.dictionary.loadedDictionary[selectedWordIndex]);
  const semanticBlock = word.semanticBlocks[semanticBlockIndex];
  const meanings = (semanticBlock.find(pos => pos.type === partOfSpeech) || {}).meanings;
  if (!meanings || meanings.length === 0) {
    const posIndex = semanticBlock.findIndex(pos => pos.type === partOfSpeech);
    yield put(actions.deletePartOfSpeech(selectedWordIndex, semanticBlockIndex, posIndex, partOfSpeech));
    yield* saveDictionarySaga();
  }
}

export function* addMeaningSaga(action) {
  const wordIndex = yield select(store => store.dictionary.selectedWordIndex);
  const branch = { ...action.branch, wordIndex };
  yield put(actions.createMeaning(branch));
  yield* saveDictionarySaga();
}

export function* editMeaningRemarkSaga(action) {
  if (!action.remark || action.remark.trim().length === 0) {
    return;
  }
  const wordIndex = yield select(store => store.dictionary.selectedWordIndex);
  const branch = { ...action.branch, wordIndex };
  yield put(actions.setMeaningRemark(branch, action.remark));
  yield* saveDictionarySaga();
}

export function* editTranslationSaga(action) {
  if (!action.translation || action.translation.trim().length === 0) {
    return;
  }
  const wordIndex = yield select(store => store.dictionary.selectedWordIndex);
  const branch = { ...action.branch, wordIndex };
  yield put(actions.setTranslation(branch, action.index, action.translation));
  yield* saveDictionarySaga();
}

export function* editElaborationSaga(action) {
  if (!action.elaboration || action.elaboration.trim().length === 0) {
    return;
  }
  const wordIndex = yield select(store => store.dictionary.selectedWordIndex);
  const branch = { ...action.branch, wordIndex };
  yield put(actions.setElaboration(branch, action.index, action.elaboration));
  yield* saveDictionarySaga();
}

export function* editExampleRemarkSaga(action) {
  if (!action.remark || action.remark.trim().length === 0) {
    return;
  }
  const wordIndex = yield select(store => store.dictionary.selectedWordIndex);
  const branch = { ...action.branch, wordIndex };
  yield put(actions.setExampleRemark(branch, action.index, action.remark));
  yield* saveDictionarySaga();
}

export function* editExampleExpressionSaga(action) {
  if (!action.expression || action.expression.trim().length === 0) {
    return;
  }
  const wordIndex = yield select(store => store.dictionary.selectedWordIndex);
  const branch = { ...action.branch, wordIndex };
  yield put(actions.setExampleExpression(branch, action.index, action.expression));
  yield* saveDictionarySaga();
}
