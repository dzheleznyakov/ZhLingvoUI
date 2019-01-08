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

const setTranscription = (state, action) =>  {
  const transcriptionsPath = getWordPath(action.branch) + `.transcriptions[${action.index}]`;
  return setInDictionary(state, transcriptionsPath, action.transcription);
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
  return setDictionary(state, remarkPath, action.remark);
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_DICTIONARY: return setDictionary(state, action);
    case actionTypes.REMOVE_DICTIONARY: return removeDictionary(state, action);
    case actionTypes.STORE_PARTS_OF_SPEECHES: return storePartsOfSpeech(state, action);
    case actionTypes.SELECT_WORD: return selectWord(state, action);
    case actionTypes.SET_EDIT_MODE: return setEditMode(state, action);
    case actionTypes.SET_WORD_NAME: return setWordName(state, action);
    case actionTypes.SET_TRANSCRIPTION: return setTranscription(state, action);
    case actionTypes.ADD_SEMANTIC_BLOCK: return addSemanticBlock(state, action);
    case actionTypes.DELETE_SEMANTIC_BLOCK: return deleteSemanticBlock(state, action);
    case actionTypes.SET_PART_OF_SPEECH: return setPartOfSpeech(state, action);
    case actionTypes.DELETE_PART_OF_SPEECH: return deletePartOfSpeech(state, action);
    case actionTypes.CREATE_MEANING: return createMeaning(state, action);
    case actionTypes.SET_MEANING_REMARK: return setMeaningRemark(state, action);
    default: return state;
  }
};

export default reducer;
