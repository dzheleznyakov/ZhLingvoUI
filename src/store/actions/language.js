import * as actionTypes from './actionTypes';

export const loadLanguages = () => ({
  type: actionTypes.LOAD_LANGUAGES,
});

export const setLanguages = (languages) => ({
  type: actionTypes.SET_LANGUAGES,
  languages,
});

export const selectLanguage = (code, name) => ({
  type: actionTypes.SELECT_LANGUAGE,
  language: {
    code,
    name,
  },
});

export const setSelectedLanguage = (code, name) => ({
  type: actionTypes.SET_SELECTED_LANGUAGE,
  language: {
    code,
    name,
  },
});

export const fetchChangeModel = (pos) => ({
  type: actionTypes.FETCH_CHANGE_MODEL,
  pos,
});

export const setChangeModel = (pos, changeModel) => ({
  type: actionTypes.SET_CHANGE_MODEL,
  pos,
  changeModel,
});
