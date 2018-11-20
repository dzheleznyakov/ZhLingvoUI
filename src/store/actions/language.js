import * as actionTypes from './actionTypes';

export const loadLanguages = () => {
  return {
    type: actionTypes.LOAD_LANGUAGES,
  };
};

export const setLanguages = (languages) => {
  return {
    type: actionTypes.SET_LANGUAGES,
    languages,
  };
};

export const selectLanguage = (code, name ) => {
  return {
    type: actionTypes.SELECT_LANGUAGE,
    language: {
      code,
      name,
    },
  };
};