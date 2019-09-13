import _ from 'lodash';

import * as actionTypes from '../actions/actionTypes';
import { updateObject, removeFromArray, addToArray } from '../../utils/utils';

const initialState = {
  loadedDictionary: [],
  partsOfSpeech: [],
  selectedWordIndex: -1,
  fetchedWord: null,
  editMode: false,
};

const findWordIndexByName = (dictionary, wordName) => {
  if (!dictionary.length) {
    return 0;
  }
  let lo = 0, hi = dictionary.length - 1;
  while (lo < hi) {
    const mi = Math.floor((lo + hi) / 2);
    if (wordName < dictionary[mi].word) {
      hi = mi - 1;
    } else if (wordName === dictionary[mi]) {
      return mi;
    } else {
      lo = mi + 1;
    }
  }
  return lo;
};

const findIndexOfTheNextWord = (state, wordName) => {
  const dictionary = state.loadedDictionary;
  const lo = findWordIndexByName(dictionary, wordName)
  return wordName < dictionary[lo].word ? lo : lo + 1;
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

const setFetchedWord = (state, action) => {
  return updateObject(state, { fetchedWord: action.wordEntry });
};

const setWord = (state, action) => {
  const { wordEntry } = action;
  const dictionary = state.loadedDictionary;
  const index = findIndexOfTheNextWord(state, wordEntry.word);
  const updatedDictionary = addToArray(dictionary, index, wordEntry);
  const updatedState = updateObject(state, { 
    loadedDictionary: updatedDictionary, 
    selectedWordIndex: index,
    editMode: true,
  });
  return updatedState;
};

const removeWordFromList = (state) => {
  if (state.selectedWordIndex < 0) {
    return state;
  }
  const newSelectedWordIndex = state.selectedWordIndex === state.loadedDictionary.length - 1
    ? state.selectedWordIndex - 1
    : state.selectedWordIndex;
  const updatedDictionary = removeFromArray(state.loadedDictionary, state.selectedWordIndex);
  return updateObject(state, { 
    loadedDictionary: updatedDictionary,
    selectedWordIndex: newSelectedWordIndex,
    editMode: false,
  });
};

const setEditMode = (state, action) => {
  const search = document.location.search;
  const editModeParam = search && search.substring(1).split('&')
    .map(entry => entry.split('='))
    .reduce((acc, tokens) => ({ ...acc, [tokens[0]]: tokens[1] }), {}).editMode === 'true';
  return updateObject(state, { editMode: editModeParam || action.editMode });
};

const setWordName = (state, action) => {
  const wordNamePath = `[${action.branch.wordIndex}].word`;
  const updatedLoadedDictionary = _.cloneDeep(state.loadedDictionary);
  _.set(updatedLoadedDictionary, wordNamePath, action.wordName);
  return updateObject(state, { loadedDictionary: updatedLoadedDictionary });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_DICTIONARY: return setDictionary(state, action);
    case actionTypes.REMOVE_DICTIONARY: return removeDictionary(state, action);
    case actionTypes.STORE_PARTS_OF_SPEECHES: return storePartsOfSpeech(state, action);
    case actionTypes.SELECT_WORD: return selectWord(state, action);
    case actionTypes.SET_FETCHED_WORD: return setFetchedWord(state, action);
    case actionTypes.SET_WORD: return setWord(state, action);
    case actionTypes.REMOVE_WORD_FROM_LIST: return removeWordFromList(state, action);
    case actionTypes.SET_EDIT_MODE: return setEditMode(state, action);
    case actionTypes.SET_WORD_NAME: return setWordName(state, action);
    default: return state;
  }
};

export default reducer;
