import { takeEvery, takeLatest } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import { loadLanguagesSaga, selectLanguageSaga } from './language';
import { 
  loadDictionarySaga, 
  editWordNameSaga, 
  editTranscriptionSaga,
  createSemanticBlockSaga,
  removeSemanticBlockAndSaveDictionarySaga,
} from './dictionary';
import { loadConfigSaga } from './config';

export function* watchLanguage() {
  yield takeEvery(actionTypes.LOAD_LANGUAGES, loadLanguagesSaga);
}

export function* watchDictionary() {
  yield takeEvery(actionTypes.LOAD_DICTIONARY, loadDictionarySaga);
  yield takeEvery(actionTypes.SELECT_LANGUAGE, selectLanguageSaga);

  yield takeLatest(actionTypes.EDIT_WORD_NAME, editWordNameSaga);
  yield takeLatest(actionTypes.EDIT_TRANSCRIPTION, editTranscriptionSaga);
  
  yield takeEvery(actionTypes.CREATE_SEMANTIC_BLOCK, createSemanticBlockSaga);
  yield takeEvery(actionTypes.REMOVE_SEMANTIC_BLOCK_AND_SAVE_DICTIONARY, removeSemanticBlockAndSaveDictionarySaga);
};

export function* watchConfig() {
  yield takeEvery(actionTypes.LOAD_CONFIG, loadConfigSaga);
}
