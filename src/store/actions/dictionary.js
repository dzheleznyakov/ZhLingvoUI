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

export const loadPartsOfSpeeches = () => {
  return {
    type: actionTypes.LOAD_PARTS_OF_SPEECHES,
  };
};

export const storePartsOfSpeech = (partsOfSpeech) => {
  return {
    type: actionTypes.STORE_PARTS_OF_SPEECHES,
    partsOfSpeech,
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

export const setWordName = (wordName, wordIndex) => {
  return {
    type: actionTypes.SET_WORD_NAME,
    branch: { wordIndex },
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
    branch: { wordIndex },
    index,
    transcription,
  };
};

export const createSemanticBlock = () => {
  return {
    type: actionTypes.CREATE_SEMANTIC_BLOCK,
  };
};

export const addSemanticBlock = (wordIndex) => {
  return {
    type: actionTypes.ADD_SEMANTIC_BLOCK,
    branch: { wordIndex },
  };
};

export const removeSemanticBlockAndSaveDictionary = (index) => {
  return {
    type: actionTypes.REMOVE_SEMANTIC_BLOCK_AND_SAVE_DICTIONARY,
    index,
  };
};

export const deleteSemanticBlock = (index, wordIndex) => {
  return {
    type: actionTypes.DELETE_SEMANTIC_BLOCK,
    branch: { wordIndex },
    index,
  };
};

export const addPartOfSpeech = (semanticBlockIndex, partOfSpeech) => {
  return {
    type: actionTypes.ADD_PART_OF_SPEECH,
    semanticBlockIndex,
    partOfSpeech,
  };
};

export const setPartOfSpeech = (wordIndex, sbIndex, partOfSpeech) => {
  return {
    type: actionTypes.SET_PART_OF_SPEECH,
    branch: { wordIndex, sbIndex },
    partOfSpeech,
  };
};

export const removePartOfSpeechAndSaveDictionary = (semanticBlockIndex, partOfSpeech) => {
  return {
    type: actionTypes.REMOVE_PART_OF_SPEECH_AND_SAVE_DICTIONARY,
    semanticBlockIndex,
    partOfSpeech,
  };
};

export const deletePartOfSpeech = (wordIndex, sbIndex, posIndex, partOfSpeech) => {
  return {
    type: actionTypes.DELETE_PART_OF_SPEECH,
    branch: { wordIndex, sbIndex },
    posIndex,
    partOfSpeech,
  };
};

export const addMeaning = (sbIndex, posIndex) => {
  return {
    type: actionTypes.ADD_MEANING,
    branch: { sbIndex, posIndex }
  };
};

export const createMeaning = ({ wordIndex, sbIndex, posIndex }) => {
  return {
    type: actionTypes.CREATE_MEANING,
    branch: { wordIndex, sbIndex, posIndex },
  };
};

export const editMeaningRemark = ({ sbIndex, posIndex, mIndex }, remark) => {
  return {
    type: actionTypes.EDIT_MEANING_REMARK,
    branch: { sbIndex, posIndex, mIndex },
    remark,
  }
};

export const setMeaningRemark = ({ wordIndex, sbIndex, posIndex, mIndex}, remark) => {
  return {
    type: actionTypes.SET_MEANING_REMARK,
    branch: { wordIndex, sbIndex, posIndex, mIndex },
    remark,
  };
};
