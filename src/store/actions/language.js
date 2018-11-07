import * as actionTypes from './actionTypes';

export const selectLanguage = (code, name ) => {
  return {
    type: actionTypes.SELECT_LANGUAGE,
    language: {
      code,
      name,
    },
  };
};