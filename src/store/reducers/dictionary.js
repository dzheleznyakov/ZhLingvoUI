import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils/utils';

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

const setWordName = (state, action) => {
  const dictionary = state.loadedDictionary;
  const updatedWord = { ...dictionary[action.index], word: action.wordName };
  const updatedDictionary = dictionary.slice(0, action.index);
  updatedDictionary.push(updatedWord);
  updatedDictionary.push(...dictionary.slice(action.index + 1));
  return updateObject(state, { loadedDictionary: updatedDictionary });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_DICTIONARY: return setDictionary(state, action);
    case actionTypes.REMOVE_DICTIONARY: return removeDictionary(state, action);
    case actionTypes.SELECT_WORD: return selectWord(state, action);
    case actionTypes.SET_EDIT_MODE: return setEditMode(state, action);
    case actionTypes.SET_WORD_NAME: return setWordName(state, action);
    default: return state;
  }
};

export default reducer;
