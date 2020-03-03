import { takeEvery, takeLatest } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import * as language from './language';
import * as dictionary from './dictionary';
import * as edition from './edition';
import { loadConfigSaga } from './config';

export function* watchLanguage() {
  yield takeEvery(actionTypes.LOAD_LANGUAGES, language.loadLanguagesSaga);
  yield takeEvery(actionTypes.SELECT_LANGUAGE, language.selectLanguageSaga);
  yield takeLatest(actionTypes.FETCH_CHANGE_MODEL, language.fetchChangeModelSaga);
}

export function* watchDictionary() {
  yield takeEvery(actionTypes.LOAD_DICTIONARY, dictionary.loadDictionarySaga);
  yield takeEvery(actionTypes.LOAD_LANGUAGE_CONSTANTS, dictionary.loadLanguageConstantsSaga);

  yield takeEvery(actionTypes.CREATE_WORD, edition.createWordSaga);
  yield takeLatest(actionTypes.FETCH_WORD, dictionary.fetchWordSaga);
  yield takeEvery(actionTypes.SAVE_WORD, dictionary.saveWordSaga)
  yield takeEvery(actionTypes.REMOVE_WORD, edition.removeWordSaga);

  yield takeEvery(actionTypes.GET_FETCHED_WORD_FORMS, dictionary.getFetchedWordFormsSaga);
  yield takeEvery(actionTypes.UPDATE_FORD_FORMS, dictionary.updateWordFormsSaga);

  yield takeEvery(actionTypes.EDIT_WORD_NAME, edition.editWordNameSaga);

  yield takeEvery(actionTypes.CREATE_TRANSCRIPTION, edition.createTranscriptionSaga);
  yield takeEvery(actionTypes.EDIT_TRANSCRIPTION, edition.editTranscriptionSaga);
  yield takeEvery(actionTypes.EDIT_GENDER, edition.editGenderSaga);
  
  yield takeEvery(actionTypes.CREATE_SEMANTIC_BLOCK, edition.createSemanticBlockSaga);
  yield takeEvery(actionTypes.DELETE_SEMANTIC_BLOCK, edition.deleteSemanticBlockSaga);

  yield takeEvery(actionTypes.CREATE_PART_OF_SPEECH, edition.createPartOfSpeechSaga);
  yield takeEvery(actionTypes.DELETE_PART_OF_SPEECH, edition.deletePartOfSpeech);

  yield takeEvery(actionTypes.CREATE_MEANING, edition.createMeaningSaga);

  yield takeEvery(actionTypes.EDIT_MEANING_REMARK, edition.editMeaningRemarkSaga);
  yield takeEvery(actionTypes.EDIT_TRANSLATION, edition.editTranslationSaga);
  yield takeEvery(actionTypes.EDIT_ELABORATION, edition.editElaborationSaga);
  yield takeEvery(actionTypes.EDIT_EXAMPLE_REMARK, edition.editExampleRemarkSaga);
  yield takeEvery(actionTypes.EDIT_EXAMPLE_EXPRESSION, edition.editExampleExpressionSaga);
  yield takeEvery(actionTypes.EDIT_EXAMPLE_EXPLANATION, edition.editExampleExplanationSaga);
};

export function* watchConfig() {
  yield takeEvery(actionTypes.LOAD_CONFIG, loadConfigSaga);
}
