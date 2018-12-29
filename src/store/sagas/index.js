import { takeEvery, takeLatest } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import { loadLanguagesSaga, selectLanguageSaga } from './language';
import { 
  loadDictionarySaga,
  loadPartsOfSpeechesSaga,
  editWordNameSaga, 
  editTranscriptionSaga,
  createSemanticBlockSaga,
  removeSemanticBlockAndSaveDictionarySaga,
  addPartOfSpeechSaga,
  removePartOfSpeechAndSaveDicitonarySaga,
} from './dictionary';
import { loadConfigSaga } from './config';

export function* watchLanguage() {
  yield takeEvery(actionTypes.LOAD_LANGUAGES, loadLanguagesSaga);
  yield takeEvery(actionTypes.SELECT_LANGUAGE, selectLanguageSaga);
}

export function* watchDictionary() {
  yield takeEvery(actionTypes.LOAD_DICTIONARY, loadDictionarySaga);
  yield takeEvery(actionTypes.LOAD_PARTS_OF_SPEECHES, loadPartsOfSpeechesSaga);

  yield takeLatest(actionTypes.EDIT_WORD_NAME, editWordNameSaga);
  yield takeLatest(actionTypes.EDIT_TRANSCRIPTION, editTranscriptionSaga);
  
  yield takeEvery(actionTypes.CREATE_SEMANTIC_BLOCK, createSemanticBlockSaga);
  yield takeEvery(actionTypes.REMOVE_SEMANTIC_BLOCK_AND_SAVE_DICTIONARY, removeSemanticBlockAndSaveDictionarySaga);

  yield takeEvery(actionTypes.ADD_PART_OF_SPEECH, addPartOfSpeechSaga);
  yield takeEvery(actionTypes.REMOVE_PART_OF_SPEECH_AND_SAVE_DICTIONARY, removePartOfSpeechAndSaveDicitonarySaga);
};

export function* watchConfig() {
  yield takeEvery(actionTypes.LOAD_CONFIG, loadConfigSaga);
}
