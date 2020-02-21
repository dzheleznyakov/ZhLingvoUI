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

export const fetchWord = (id) => ({
  type: actionTypes.FETCH_WORD,
  id,
});

export const setFetchedWord = (wordEntry) => ({
  type: actionTypes.SET_FETCHED_WORD,
  wordEntry,
});

export const getFetchedWordForms = (pos) => ({
  type: actionTypes.GET_FETCHED_WORD_FORMS,
  pos,
});

export const setFetchedWordForms = (forms) => ({
  type: actionTypes.SET_FETCHED_WORD_FORMS,
  forms,
});

export const updateWordForms = (pos, forms) => ({
  type: actionTypes.UPDATE_FORD_FORMS,
  pos,
  forms,
});

export const saveWord = (wordEntry) => ({
  type: actionTypes.SAVE_WORD,
  wordEntry,
})

export const setWord = ({ id, word }) => ({
  type: actionTypes.SET_WORD,
  wordEntry: { id, word },
});

export const removeWord = () => ({
  type: actionTypes.REMOVE_WORD,
});

export const removeWordFromList = () => ({
  type: actionTypes.REMOVE_WORD_FROM_LIST,
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

export const editTranscription = (transcription, index) => ({
  type: actionTypes.EDIT_TRANSCRIPTION,
  transcription,
  index,
});

export const createSemanticBlock = () => ({
  type: actionTypes.CREATE_SEMANTIC_BLOCK,
});

export const deleteSemanticBlock = (index) => {
  return {
    type: actionTypes.DELETE_SEMANTIC_BLOCK,
    index,
  };
};

export const createPartOfSpeech = (semanticBlockIndex, partOfSpeech) => {
  return {
    type: actionTypes.CREATE_PART_OF_SPEECH,
    semanticBlockIndex,
    partOfSpeech,
  };
};

export const deletePartOfSpeech = (semanticBlockIndex, partOfSpeech) => {
  return {
    type: actionTypes.DELETE_PART_OF_SPEECH,
    semanticBlockIndex,
    partOfSpeech,
  };
};

export const createMeaning = ({ sbIndex, posIndex }, translation) => {
  return {
    type: actionTypes.CREATE_MEANING,
    branch: { sbIndex, posIndex },
    translation,
  };
};

export const editMeaningRemark = ({ sbIndex, posIndex, mIndex }, remark) => {
  return {
    type: actionTypes.EDIT_MEANING_REMARK,
    branch: { sbIndex, posIndex, mIndex },
    remark,
  }
};

export const editTranslation = ({ sbIndex, posIndex, mIndex}, index, translation) => ({
  type: actionTypes.EDIT_TRANSLATION,
  branch: { sbIndex, posIndex, mIndex },
  index,
  translation,
});

export const editElaboration = ({ sbIndex, posIndex, mIndex }, index, elaboration) => ({
  type: actionTypes.EDIT_ELABORATION,
  branch: { sbIndex, posIndex, mIndex },
  index,
  elaboration,
});

export const editExampleRemark = ({ sbIndex, posIndex, mIndex }, index, remark) => ({
  type: actionTypes.EDIT_EXAMPLE_REMARK,
  branch: { sbIndex, posIndex, mIndex},
  index,
  remark,
});

export const editExampleExpression = ({ sbIndex, posIndex, mIndex }, index, expression) => ({
  type: actionTypes.EDIT_EXAMPLE_EXPRESSION,
  branch: { sbIndex, posIndex, mIndex },
  index,
  expression,
});

export const editExampleExplanation = ({ sbIndex, posIndex, mIndex }, index, explanation) => ({
  type: actionTypes.EDIT_EXAMPLE_EXPLANATION,
  branch: { sbIndex, posIndex, mIndex },
  index,
  explanation,
});
