import * as actionTypes from './actionTypes';

export const loadDictionary = () => ({
  type: actionTypes.LOAD_DICTIONARY,
});

export const setDictionary = (dictionary) => ({
  type: actionTypes.SET_DICTIONARY,
  dictionary,
});

export const removeDictionary = () => ({
  type: actionTypes.REMOVE_DICTIONARY,
});

export const loadPartsOfSpeeches = () => ({
  type: actionTypes.LOAD_PARTS_OF_SPEECHES,
});

export const storePartsOfSpeech = (partsOfSpeech) => ({
  type: actionTypes.STORE_PARTS_OF_SPEECHES,
  partsOfSpeech,
});

export const selectWord = (index) => ({
  type: actionTypes.SELECT_WORD,
  index,
});

export const createWord = (wordName) => ({
  type: actionTypes.CREATE_WORD,
  wordName,
});

export const setWord = ({ id, word }) => ({
  type: actionTypes.SET_WORD,
  wordEntry: { id, word },
});

export const setEditMode = (editMode) => ({
  type: actionTypes.SET_EDIT_MODE,
  editMode,
});

export const editWordName = (wordName) => ({
  type: actionTypes.EDIT_WORD_NAME,
  wordName,
});

export const setWordName = (wordName, wordIndex) => ({
  type: actionTypes.SET_WORD_NAME,
  branch: { wordIndex },
  wordName,
});

export const createTranscription = (transcription) => ({
  type: actionTypes.CREATE_TRANSCRIPTION,
  transcription
});

export const addTranscription = (transcription) => ({
  type: actionTypes.ADD_TRANSCRIPTION,
  transcription,
});

export const deleteTranscription = (index, wordIndex) => ({
  type: actionTypes.DELETE_TRANSCRIPTION,
  index,
  branch: { wordIndex },
});

export const editTranscription = (transcription, index) => ({
  type: actionTypes.EDIT_TRANSCRIPTION,
  transcription,
  index,
});

export const setTranscription = (transcription, index, wordIndex) => ({
  type: actionTypes.SET_TRANSCRIPTION,
  branch: { wordIndex },
  index,
  transcription,
});

export const createSemanticBlock = () => ({
  type: actionTypes.CREATE_SEMANTIC_BLOCK,
});

export const addSemanticBlock = (wordIndex) => ({
  type: actionTypes.ADD_SEMANTIC_BLOCK,
  branch: { wordIndex },
});

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

export const addMeaning = ({ sbIndex, posIndex }, translation) => {
  return {
    type: actionTypes.ADD_MEANING,
    branch: { sbIndex, posIndex },
    translation,
  };
};

export const createMeaning = ({ wordIndex, sbIndex, posIndex }, translation) => ({
    type: actionTypes.CREATE_MEANING,
    branch: { wordIndex, sbIndex, posIndex },
    translation,
});

export const deleteMeaning = ({ wordIndex, sbIndex, posIndex }, index) => ({
  type: actionTypes.DELETE_MEANING,
  branch: { wordIndex, sbIndex, posIndex },
  index,
});

export const editMeaningRemark = ({ sbIndex, posIndex, mIndex }, remark) => {
  return {
    type: actionTypes.EDIT_MEANING_REMARK,
    branch: { sbIndex, posIndex, mIndex },
    remark,
  }
};

export const setMeaningRemark = ({ wordIndex, sbIndex, posIndex, mIndex }, remark) => ({
  type: actionTypes.SET_MEANING_REMARK,
  branch: { wordIndex, sbIndex, posIndex, mIndex },
  remark,
});

export const deleteMeaningRemark = ({ wordIndex, sbIndex, posIndex, mIndex }) => ({
  type: actionTypes.DELETE_MEANING_REMARK,
  branch: { wordIndex, sbIndex, posIndex, mIndex },
});

export const editTranslation = ({ sbIndex, posIndex, mIndex}, index, translation) => ({
  type: actionTypes.EDIT_TRANSLATION,
  branch: { sbIndex, posIndex, mIndex },
  index,
  translation,
});

export const setTranslation = ({ wordIndex, sbIndex, posIndex, mIndex }, index, translation) => ({
  type: actionTypes.SET_TRANSLATION,
  branch: { wordIndex, sbIndex, posIndex, mIndex },
  index,
  translation,
});

export const deleteTranslation = ({ wordIndex, sbIndex, posIndex, mIndex }, index) => ({
  type: actionTypes.DELETE_TRANSLATION,
  branch: { wordIndex, sbIndex, posIndex, mIndex },
  index,
});

export const editElaboration = ({ sbIndex, posIndex, mIndex }, index, elaboration) => ({
  type: actionTypes.EDIT_ELABORATION,
  branch: { sbIndex, posIndex, mIndex },
  index,
  elaboration,
});

export const setElaboration = ({ wordIndex, sbIndex, posIndex, mIndex }, index, elaboration) => ({
  type: actionTypes.SET_ELABORATION,
  branch: { wordIndex, sbIndex, posIndex, mIndex },
  index,
  elaboration,
});

export const deleteElaboration= ({ wordIndex, sbIndex, posIndex, mIndex }, index) => ({
  type: actionTypes.DELETE_ELABORATION,
  branch: { wordIndex, sbIndex, posIndex, mIndex  },
  index,
});

export const editExampleRemark = ({ sbIndex, posIndex, mIndex }, index, remark) => ({
  type: actionTypes.EDIT_EXAMPLE_REMARK,
  branch: { sbIndex, posIndex, mIndex},
  index,
  remark,
});

export const setExampleRemark = ({ wordIndex, sbIndex, posIndex, mIndex }, index, remark) => ({
  type: actionTypes.SET_EXAMPLE_REMARK,
  branch: { wordIndex, sbIndex, posIndex, mIndex},
  index,
  remark,
});

export const deleteExampleRemark = ({ wordIndex, sbIndex, posIndex, mIndex }, index ) => ({
  type: actionTypes.DELETE_EXAMPLE_REMARK,
  branch: { wordIndex, sbIndex, posIndex, mIndex},
  index,
});

export const editExampleExpression = ({ wordIndex, sbIndex, posIndex, mIndex }, index, expression) => ({
  type: actionTypes.EDIT_EXAMPLE_EXPRESSION,
  branch: { wordIndex, sbIndex, posIndex, mIndex },
  index,
  expression,
});

export const setExampleExpression = ({ wordIndex, sbIndex, posIndex, mIndex }, index, expression) => ({
  type: actionTypes.SET_EXAMPLE_EXPRESSION,
  branch: { wordIndex, sbIndex, posIndex, mIndex},
  index,
  expression,
});

export const deleteExampleExpression = ({ wordIndex, sbIndex, posIndex, mIndex }, index) => ({
  type: actionTypes.DELETE_EXAMPLE_EXPRESSION,
  branch: { wordIndex, sbIndex, posIndex, mIndex},
  index,
});

export const editExampleExplanation = ({ wordIndex, sbIndex, posIndex, mIndex }, index, explanation) => ({
  type: actionTypes.EDIT_EXAMPLE_EXPLANATION,
  branch: { wordIndex, sbIndex, posIndex, mIndex },
  index,
  explanation,
});

export const setExampleExplanation = ({ wordIndex, sbIndex, posIndex, mIndex }, index, explanation) => ({
  type: actionTypes.SET_EXAMPLE_EXPLANATION,
  branch: { wordIndex, sbIndex, posIndex, mIndex },
  index,
  explanation,
});

export const deleteExampleExplanation = ({ wordIndex, sbIndex, posIndex, mIndex }, index) => ({
  type: actionTypes.DELETE_EXAMPLE_EXPLANATION,
  branch: { wordIndex, sbIndex, posIndex, mIndex },
  index,
});

export const deleteExample = ({ wordIndex, sbIndex, posIndex, mIndex }, index) => ({
  type: actionTypes.DELETE_EXAMPLE,
  branch: { wordIndex, sbIndex, posIndex, mIndex },
  index,
});
