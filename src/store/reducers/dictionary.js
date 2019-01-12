import _ from 'lodash';

import * as actionTypes from '../actions/actionTypes';
import { updateObject, removeFromArray } from '../../utils/utils';

const initialState = {
  loadedDictionary: [],
  partsOfSpeech: [],
  selectedWordIndex: -1,
  editMode: false,
};

const getWordPath = ({ wordIndex }) =>
  `[${wordIndex}]`;

const getSemanticBlockPath = ({ wordIndex, sbIndex }) =>
  `[${wordIndex}].semanticBlocks[${sbIndex}]`;

const getPartOfSpeechPath = ({ wordIndex, sbIndex, posIndex }) =>
  `[${wordIndex}].semanticBlocks[${sbIndex}][${posIndex}]`;

const getMeaningPath = ({ wordIndex, sbIndex, posIndex, mIndex }) =>
  `[${wordIndex}].semanticBlocks[${sbIndex}][${posIndex}].meanings[${mIndex}]`;

const setDictionary = (state, action) => {
  return updateObject(state, { loadedDictionary: action.dictionary });
};

const removeDictionary = (state) => {
  return updateObject(state, { 
    loadedDictionary: [], 
    partsOfSpeech: [],
    selectedWordIndex: -1, 
  });
};

const storePartsOfSpeech = (state, action) => {
  return updateObject(state, { partsOfSpeech: action.partsOfSpeech });
};

const selectWord = (state, action) => {
  return updateObject(state, { selectedWordIndex: action.index });
};

const setEditMode = (state, action) => {
  return updateObject(state, { editMode: action.editMode });
};

const setInDictionary = (state, path, value) => {
  const updatedLoadedDictionary = _.cloneDeep(state.loadedDictionary);
  _.set(updatedLoadedDictionary, path, value);
  return updateObject(state, { loadedDictionary: updatedLoadedDictionary });
};

const updateInDictionary = (state, path, updater) => {
  const updatedLoadedDictionary = _.cloneDeep(state.loadedDictionary);
  _.update(updatedLoadedDictionary, path, updater);
  return updateObject(state, { loadedDictionary: updatedLoadedDictionary });
}

const setWordName = (state, action) => {
  const wordNamePath = getWordPath(action.branch) + '.word';
  return setInDictionary(state, wordNamePath, action.wordName);
};

const addTranscription = (state) => {
  const branch = { wordIndex: state.selectedWordIndex };
  const transcriptionsPath = getWordPath(branch) + '.transcriptions';
  return updateInDictionary(state, transcriptionsPath, (tr) => _.concat(tr || [], [[]]));
};

const deleteTranscription = (state, action) => {
  const transcriptionsBranch = getWordPath(action.branch) + '.transcriptions';
  return updateInDictionary(state, transcriptionsBranch, (tr) => removeFromArray(tr, action.index));
};

const setTranscription = (state, action) =>  {
  const transcriptionPath = getWordPath(action.branch) + `.transcriptions[${action.index}]`;
  return setInDictionary(state, transcriptionPath, action.transcription);
};

const addSemanticBlock = (state, action) => {
  const semanticBlocksPath = getWordPath(action.branch) + '.semanticBlocks';
  return updateInDictionary(state, semanticBlocksPath, (sBlocks) => _.concat(sBlocks || [], [[]]));
};

const deleteSemanticBlock = (state, action) => {
  const semanticBlocksPath = getWordPath(action.branch) + '.semanticBlocks';
  return updateInDictionary(state, semanticBlocksPath, (sBlocks => removeFromArray(sBlocks, action.index)));
};

const setPartOfSpeech = (state, action) => {
  const partOfSpeechesPath = getSemanticBlockPath(action.branch);
  return updateInDictionary(state, partOfSpeechesPath, (sb) => _.concat(sb, { type: action.partOfSpeech }));
};

const deletePartOfSpeech = (state, action) => {
  const partOfSpeechesPath = getSemanticBlockPath(action.branch);
  return updateInDictionary(state, partOfSpeechesPath, (sb) => removeFromArray(sb, action.posIndex));
};

const createMeaning = (state, action) => {
  const meaningsPath = getPartOfSpeechPath(action.branch) + '.meanings';
  return updateInDictionary(state, meaningsPath, (m) => _.concat(m || [], { translations: [] }));
};

const setMeaningRemark = (state, action) => {
  const remarkPath = getMeaningPath(action.branch) + '.remark';
  return setInDictionary(state, remarkPath, action.remark);
};

const setTranslation = (state, action) => {
  const translationPath = getMeaningPath(action.branch) + `.translations[${action.index}].translation`;
  return setInDictionary(state, translationPath, action.translation);
};

const setElaboration = (state, action) => {
  const elaborationPath = getMeaningPath(action.branch) + `translations[${action.index}].elaboration`;
  return setInDictionary(state, elaborationPath, action.elaboration);
};

const setExampleRemark = (state, action) => {
  const exampleRemarkPath = getMeaningPath(action.branch) + `examples[${action.index}].remark`;
  return setInDictionary(state, exampleRemarkPath, action.remark);
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_DICTIONARY: return setDictionary(state, action);
    case actionTypes.REMOVE_DICTIONARY: return removeDictionary(state, action);
    case actionTypes.STORE_PARTS_OF_SPEECHES: return storePartsOfSpeech(state, action);
    case actionTypes.SELECT_WORD: return selectWord(state, action);
    case actionTypes.SET_EDIT_MODE: return setEditMode(state, action);
    case actionTypes.SET_WORD_NAME: return setWordName(state, action);
    case actionTypes.ADD_TRANSCRIPTION: return addTranscription(state, action);
    case actionTypes.DELETE_TRANSCRIPTION: return deleteTranscription(state, action);
    case actionTypes.SET_TRANSCRIPTION: return setTranscription(state, action);
    case actionTypes.ADD_SEMANTIC_BLOCK: return addSemanticBlock(state, action);
    case actionTypes.DELETE_SEMANTIC_BLOCK: return deleteSemanticBlock(state, action);
    case actionTypes.SET_PART_OF_SPEECH: return setPartOfSpeech(state, action);
    case actionTypes.DELETE_PART_OF_SPEECH: return deletePartOfSpeech(state, action);
    case actionTypes.CREATE_MEANING: return createMeaning(state, action);
    case actionTypes.SET_MEANING_REMARK: return setMeaningRemark(state, action);
    case actionTypes.SET_TRANSLATION: return setTranslation(state, action);
    case actionTypes.SET_ELABORATION: return setElaboration(state, action);
    case actionTypes.SET_EXAMPLE_REMARK: return setExampleRemark(state, action);
    default: return state;
  }
};

export default reducer;
