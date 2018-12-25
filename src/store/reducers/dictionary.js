import * as actionTypes from '../actions/actionTypes';
import { updateObject, updateArray } from '../../utils/utils';

const initialState = {
  loadedDictionary: [],
  selectedWordIndex: -1,
  editMode: false,
};

const setDictionary = (state, action) => {
  return updateObject(state, { loadedDictionary: action.dictionary });
};

const removeDictionary = (state) => {
  return updateObject(state, { loadedDictionary: [], selectedWordIndex: -1 });
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

const setWordName = (state, action) => updateWord(state, action.index, oldWord => ({
  ...oldWord, 
  word: action.wordName,
}));

const setTranscription = (state, action) => updateWord(state, action.wordIndex, oldWord => {
  const { transcriptions } = oldWord;
  const updatedTranscriptions = updateArray(transcriptions, action.index, action.transcription);
  return {
    ...oldWord,
    transcriptions: updatedTranscriptions,
  };
});

const addSemanticBlock = (state, action) => updateWord(state, action.wordIndex, oldWord => {
  const updatedSematicBlocks = oldWord.semanticBlocks || [];
  updatedSematicBlocks.push({});
  return {
    ...oldWord,
    semanticBlocks: updatedSematicBlocks,
  };
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_DICTIONARY: return setDictionary(state, action);
    case actionTypes.REMOVE_DICTIONARY: return removeDictionary(state, action);
    case actionTypes.SELECT_WORD: return selectWord(state, action);
    case actionTypes.SET_EDIT_MODE: return setEditMode(state, action);
    case actionTypes.SET_WORD_NAME: return setWordName(state, action);
    case actionTypes.SET_TRANSCRIPTION: return setTranscription(state, action);
    case actionTypes.ADD_SEMANTIC_BLOCK: return addSemanticBlock(state, action);
    default: return state;
  }
};

export default reducer;
