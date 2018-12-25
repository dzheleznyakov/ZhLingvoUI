import * as actionTypes from './actionTypes';

export const loadDictionary = () => {
  return {
    type: actionTypes.LOAD_DICTIONARY,
  };
};

export const setDictionary = (dictionary) => {
  return {
    type: actionTypes.SET_DICTIONARY,
    dictionary,
  };
};

export const removeDictionary = () => {
  return {
    type: actionTypes.REMOVE_DICTIONARY,
  };
};

export const selectWord = (index) => {
  return {
    type: actionTypes.SELECT_WORD,
    index,
  };
};

export const setEditMode = (editMode) => {
  return {
    type: actionTypes.SET_EDIT_MODE,
    editMode,
  };
};

export const editWordName = (wordName) => {
  return {
    type: actionTypes.EDIT_WORD_NAME,
    wordName,
  }
};

export const setWordName = (wordName, index) => {
  return {
    type: actionTypes.SET_WORD_NAME,
    index,
    wordName,
  };
};

export const editTranscription = (transcription, index) => {
  return {
    type: actionTypes.EDIT_TRANSCRIPTION,
    transcription,
    index,
  };
};

export const setTranscription = (transcription, index, wordIndex) => {
  return {
    type: actionTypes.SET_TRANSCRIPTION,
    transcription,
    index,
    wordIndex,
  };
};
