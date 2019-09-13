import { takeEvery, takeLatest } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import { loadLanguagesSaga, selectLanguageSaga } from './language';
import { 
  loadDictionarySaga,
  loadPartsOfSpeechesSaga,
  fetchWordSaga,
  saveWordSaga,
} from './dictionary';
import {
  editWordNameSaga,
  createTranscriptionSaga,
  editTranscriptionSaga,
  createSemanticBlockSaga,
  deleteSemanticBlockSaga,
  createPartOfSpeechSaga,
  deletePartOfSpeech,
  createMeaningSaga,
  editMeaningRemarkSaga,
  editTranslationSaga,
  editElaborationSaga,
  editExampleRemarkSaga,
  editExampleExpressionSaga,
  editExampleExplanationSaga,
  createWordSaga,
  removeWordSaga,
} from './edition';
import { loadConfigSaga } from './config';

export function* watchLanguage() {
  yield takeEvery(actionTypes.LOAD_LANGUAGES, loadLanguagesSaga);
  yield takeEvery(actionTypes.SELECT_LANGUAGE, selectLanguageSaga);
}

export function* watchDictionary() {
  yield takeEvery(actionTypes.LOAD_DICTIONARY, loadDictionarySaga);
  yield takeEvery(actionTypes.LOAD_PARTS_OF_SPEECHES, loadPartsOfSpeechesSaga);

  yield takeEvery(actionTypes.CREATE_WORD, createWordSaga);
  yield takeLatest(actionTypes.FETCH_WORD, fetchWordSaga);
  yield takeEvery(actionTypes.SAVE_WORD, saveWordSaga)
  yield takeEvery(actionTypes.REMOVE_WORD, removeWordSaga);

  yield takeEvery(actionTypes.EDIT_WORD_NAME, editWordNameSaga);

  yield takeEvery(actionTypes.CREATE_TRANSCRIPTION, createTranscriptionSaga);
  yield takeEvery(actionTypes.EDIT_TRANSCRIPTION, editTranscriptionSaga);
  
  yield takeEvery(actionTypes.CREATE_SEMANTIC_BLOCK, createSemanticBlockSaga);
  yield takeEvery(actionTypes.DELETE_SEMANTIC_BLOCK, deleteSemanticBlockSaga);

  yield takeEvery(actionTypes.CREATE_PART_OF_SPEECH, createPartOfSpeechSaga);
  yield takeEvery(actionTypes.DELETE_PART_OF_SPEECH, deletePartOfSpeech);

  yield takeEvery(actionTypes.CREATE_MEANING, createMeaningSaga);

  yield takeEvery(actionTypes.EDIT_MEANING_REMARK, editMeaningRemarkSaga);
  yield takeEvery(actionTypes.EDIT_TRANSLATION, editTranslationSaga);
  yield takeEvery(actionTypes.EDIT_ELABORATION, editElaborationSaga);
  yield takeEvery(actionTypes.EDIT_EXAMPLE_REMARK, editExampleRemarkSaga);
  yield takeEvery(actionTypes.EDIT_EXAMPLE_EXPRESSION, editExampleExpressionSaga);
  yield takeEvery(actionTypes.EDIT_EXAMPLE_EXPLANATION, editExampleExplanationSaga);
};

export function* watchConfig() {
  yield takeEvery(actionTypes.LOAD_CONFIG, loadConfigSaga);
}
