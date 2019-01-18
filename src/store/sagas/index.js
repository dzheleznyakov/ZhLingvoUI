import { takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import { loadLanguagesSaga, selectLanguageSaga } from './language';
import { 
  loadDictionarySaga,
  loadPartsOfSpeechesSaga,
  editWordNameSaga,
  createTranscriptionSaga,
  editTranscriptionSaga,
  createSemanticBlockSaga,
  removeSemanticBlockAndSaveDictionarySaga,
  addPartOfSpeechSaga,
  removePartOfSpeechAndSaveDicitonarySaga,
  addMeaningSaga,
  editMeaningRemarkSaga,
  editTranslationSaga,
  editElaborationSaga,
  editExampleRemarkSaga,
  editExampleExpressionSaga,
  editExampleExplanationSaga,
} from './dictionary';
import { loadConfigSaga } from './config';

export function* watchLanguage() {
  yield takeEvery(actionTypes.LOAD_LANGUAGES, loadLanguagesSaga);
  yield takeEvery(actionTypes.SELECT_LANGUAGE, selectLanguageSaga);
}

export function* watchDictionary() {
  yield takeEvery(actionTypes.LOAD_DICTIONARY, loadDictionarySaga);
  yield takeEvery(actionTypes.LOAD_PARTS_OF_SPEECHES, loadPartsOfSpeechesSaga);

  yield takeEvery(actionTypes.EDIT_WORD_NAME, editWordNameSaga);

  yield takeEvery(actionTypes.CREATE_TRANSCRIPTION, createTranscriptionSaga);
  yield takeEvery(actionTypes.EDIT_TRANSCRIPTION, editTranscriptionSaga);
  
  yield takeEvery(actionTypes.CREATE_SEMANTIC_BLOCK, createSemanticBlockSaga);
  yield takeEvery(actionTypes.REMOVE_SEMANTIC_BLOCK_AND_SAVE_DICTIONARY, removeSemanticBlockAndSaveDictionarySaga);

  yield takeEvery(actionTypes.ADD_PART_OF_SPEECH, addPartOfSpeechSaga);
  yield takeEvery(actionTypes.REMOVE_PART_OF_SPEECH_AND_SAVE_DICTIONARY, removePartOfSpeechAndSaveDicitonarySaga);

  yield takeEvery(actionTypes.ADD_MEANING, addMeaningSaga);
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
