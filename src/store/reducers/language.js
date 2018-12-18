import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils/utils';

const intialState = {
  languages: [],
  selectedLanguage: null,
};

const setSelectedLanguage = (state, action) => {
  return updateObject(state, { selectedLanguage: action.language } );
};

const setLanguages = (state, action) => {
  return updateObject(state, { languages: action.languages });
};

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case actionTypes.SET_LANGUAGES: return setLanguages(state, action);
    case actionTypes.SET_SELECTED_LANGUAGE: return setSelectedLanguage(state, action);
    default: return state;
  }
};

export default reducer;