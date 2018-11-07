import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils/utils';

const intialState = {
  selectedLanguage: null,
};

const selectLanguage = (state, action) => {
  return updateObject(state, { selectedLanguage: action.language } );
};

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case actionTypes.SELECT_LANGUAGE: return selectLanguage(state, action);
    default: return state;
  }
};

export default reducer;