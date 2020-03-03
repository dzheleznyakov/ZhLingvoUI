import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils/utils';

const intialState = {
  languages: [],
  selectedLanguage: null,
  changeModels: null,
  languageConstants: {
    pos: [],
    genders: [],
  },
};

const setSelectedLanguage = (state, action) => {
  return updateObject(state, { 
    selectedLanguage: action.language,
    changeModels: null,
  } );
};

const setLanguages = (state, action) => {
  return updateObject(state, { languages: action.languages });
};

const setChangeModel = (state, action) => {
  const { pos, changeModel } = action;
  const updatedChangeModels = updateObject(state.changeModels, { [pos]: changeModel });
  return updateObject(state, { changeModels: updatedChangeModels });
};

const storeLanguageConstants = (state, action) => {
  const { pos, genders } = action.languageConstants;
  const updatedLanguageConstants = { ...state.languageConstants,
    pos, genders };
  return { ...state, languageConstants: updatedLanguageConstants};
};

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case actionTypes.SET_LANGUAGES: return setLanguages(state, action);
    case actionTypes.SET_SELECTED_LANGUAGE: return setSelectedLanguage(state, action);
    case actionTypes.SET_CHANGE_MODEL: return setChangeModel(state, action);
    case actionTypes.STORE_LANGUAGE_CONSTANTS: return storeLanguageConstants(state, action);
    default: return state;
  }
};

export default reducer;