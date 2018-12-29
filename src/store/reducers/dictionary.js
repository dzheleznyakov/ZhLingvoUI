import * as actionTypes from '../actions/actionTypes';
import { updateObject, updateArray, removeFromArray } from '../../utils/utils';

const initialState = {
  loadedDictionary: [],
  partsOfSpeech: [],
  selectedWordIndex: -1,
  editMode: false,
};

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

const updateWord = (state, wordIndex, getUpdateWord) => {
  const dictionary = state.loadedDictionary;
  const oldWord = dictionary[wordIndex];
  const updatedWord = getUpdateWord(oldWord);
  const updatedDictionary = updateArray(dictionary, wordIndex, updatedWord);
  return updateObject(state, { loadedDictionary: updatedDictionary });
};

const setWordName = (state, action) => updateWord(state, action.index, oldWord => 
  updateObject(oldWord, { word: action.wordName })
);

const setTranscription = (state, action) => updateWord(state, action.wordIndex, oldWord => {
  const { transcriptions } = oldWord;
  const updatedTranscriptions = updateArray(transcriptions, action.index, action.transcription);
  return updateObject(oldWord, { transcriptions: updatedTranscriptions });
});

const addSemanticBlock = (state, action) => updateWord(state, action.wordIndex, oldWord => {
  const updatedSematicBlocks = oldWord.semanticBlocks || [];
  updatedSematicBlocks.push([]);
  return updateObject(oldWord, { semanticBlocks: updatedSematicBlocks });
});

const deleteSemanticBlock = (state, action) => updateWord(state, action.wordIndex, oldWord => {
  const { index } = action;
  const semanticBlocks = oldWord.semanticBlocks;
  const updatedSemanticBlocks = removeFromArray(semanticBlocks, index);
  return updateObject(oldWord, { semanticBlocks: updatedSemanticBlocks });
});

const setPartOfSpeech = (state, action) => updateWord(state, action.wordIndex, oldWord => {
  const { semanticBlockIndex, partOfSpeech } = action;
  const updatedSemanticBlocks = [...oldWord.semanticBlocks];
  const updatedBlock = updatedSemanticBlocks[semanticBlockIndex];
  updatedBlock.push({ type: partOfSpeech });
  updatedSemanticBlocks[semanticBlockIndex] = updatedBlock;
  return updateObject(oldWord, { semanticBlocks: updatedSemanticBlocks });
});

const deletePartOfSpeech = (state, action) => updateWord(state, action.wordIndex, oldWord => {
  const { semanticBlockIndex, partOfSpeech } = action;
  const semanticBlock = oldWord.semanticBlocks[semanticBlockIndex];
  const posIndex = semanticBlock.findIndex(pos => pos.type === partOfSpeech);
  const updatedSB = removeFromArray(semanticBlock, posIndex);
  const updatedSBs = updateArray(oldWord.semanticBlocks, semanticBlockIndex, updatedSB);
  return updateObject(oldWord, { semanticBlocks: updatedSBs });
});

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
    default: return state;
  }
};

export default reducer;
