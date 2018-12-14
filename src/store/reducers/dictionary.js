import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils/utils';

const initialState = {
  loadedDictionary: [],
  selectedWordIndex: -1,
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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_DICTIONARY: return setDictionary(state, action);
    case actionTypes.REMOVE_DICTIONARY: return removeDictionary(state, action);
    case actionTypes.SELECT_WORD: return selectWord(state, action);
    default: return state;
  }
};

export default reducer;
