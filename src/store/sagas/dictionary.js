import { put, call, select } from 'redux-saga/effects';
import _ from 'lodash';

import { 
  loadDictionary, 
  saveDictionary, 
  loadPartsOfSpeech,
  addWord,
} from '../../async/dictionary';
import { getExamplePath, getMeaningPath } from '../../utils/branches';
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

export function* createWordSaga(action) {
  const word = action.wordName;
  const id = yield call(addWord, word);
  yield put(actions.setWord({ id, word }));
  yield* saveDictionarySaga();
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

export function* createTranscriptionSaga(action) {
  yield put(actions.addTranscription(action.transcription));
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
  yield put(actions.createMeaning(branch, action.translation));
  yield* saveDictionarySaga();
}

export function* editMeaningRemarkSaga(action) {
  const wordIndex = yield select(store => store.dictionary.selectedWordIndex);
  const branch = { ...action.branch, wordIndex };
  if (action.remark) {
    yield put(actions.setMeaningRemark(branch, action.remark));
  } else {
    yield put(actions.deleteMeaningRemark(branch));
  }
  yield* saveDictionarySaga();
}

function* deleteMeaningIfNecessarySaga(branch) {
  const meaningPath = getMeaningPath(branch);
    const meaning = yield select(store => _.get(store.dictionary.loadedDictionary, meaningPath));
    if (!meaning.translations && !meaning.examples) {
      yield put(actions.deleteMeaning(branch, branch.mIndex));
    }
}

export function* editTranslationSaga(action) {
  const wordIndex = yield select(store => store.dictionary.selectedWordIndex);
  const branch = { ...action.branch, wordIndex };
  if (action.translation) {
    yield put(actions.setTranslation(branch, action.index, action.translation));
  } else {
    yield put(actions.deleteTranslation(branch, action.index));
    yield* deleteMeaningIfNecessarySaga(branch);
  }
  yield* saveDictionarySaga();
}

export function* editElaborationSaga(action) {
  const wordIndex = yield select(store => store.dictionary.selectedWordIndex);
  const branch = { ...action.branch, wordIndex };
  if (action.elaboration) {
    yield put(actions.setElaboration(branch, action.index, action.elaboration));
  } else {
    yield put(actions.deleteElaboration(branch, action.index));
  }
  yield* saveDictionarySaga();
}

export function* editExampleRemarkSaga(action) {
  const wordIndex = yield select(store => store.dictionary.selectedWordIndex);
  const branch = { ...action.branch, wordIndex };
  if (action.remark) {
    yield put(actions.setExampleRemark(branch, action.index, action.remark));
  } else {
    yield put(actions.deleteExampleRemark(branch, action.index));
  }
  yield* saveDictionarySaga();
}

export function* editExampleExpressionSaga(action) {
  const wordIndex = yield select(store => store.dictionary.selectedWordIndex);
  const branch = { ...action.branch, wordIndex };
  const { expression } = action;
  if (expression) {
    yield put(actions.setExampleExpression(branch, action.index, expression));
  } else {
    yield put(actions.deleteExampleExpression(branch, action.index));
  }
  const explanationPath = getExamplePath({ ...branch, exIndex: action.index }) + '.explanation';
  const explanation = yield select(store => _.get(store.dictionary.loadedDictionary, explanationPath));
  if (!expression && !explanation) {
    yield put(actions.deleteExample(branch, action.index));
    yield* deleteMeaningIfNecessarySaga(branch);
  }
  yield* saveDictionarySaga();
}

export function* editExampleExplanationSaga(action) {
  const wordIndex = yield select(store => store.dictionary.selectedWordIndex);
  const branch = { ...action.branch, wordIndex };
  const { explanation } = action;
  if (explanation) {
    yield put(actions.setExampleExplanation(branch, action.index, explanation));
  } else {
    yield put(actions.deleteExampleExplanation(branch, action.index));
  }
  const expressionPath = getExamplePath({ ...branch, exIndex: action.index }) + '.expression';
  const expression = yield select(store => _.get(store.dictionary.loadedDictionary, expressionPath));
  if (!expression && !explanation) {
    yield put(actions.deleteExample(branch, action.index));
    yield* deleteMeaningIfNecessarySaga(branch);
  }
  yield* saveDictionarySaga();
}
