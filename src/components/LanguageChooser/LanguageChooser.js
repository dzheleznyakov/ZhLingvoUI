import React from 'react';
import { connect } from 'react-redux';

import LanguageIcon from './LanguageIcon';
import Dropdown from '../UI/Dropdown/Dropdown';
import * as actions from '../../store/actions/';

const languages = [
  { code: 'En', name: 'English' }, 
  { code: 'Es', name: 'Epañol' }, 
  { code: 'Ru', name: 'Русский' },
];

const languageChooser = (props) => {
  const options = languages.map(lang => {
    return (
      <div 
        key={lang.code} 
        languageSelected={() => props.onLanguageSelected(lang)}
      >
        <LanguageIcon fontSize='16px'>{lang.code}</LanguageIcon>
        {lang.name}
      </div>
    );
  });

  const currentLanguageName = props.selectedLanguage && props.selectedLanguage.name;
  let currentLanguageMessage = currentLanguageName
    ? `Selected language: ${currentLanguageName}`
    : 'No language selected';

  return (
    <React.Fragment>
      <div>{currentLanguageMessage}</div>
      <Dropdown options={options} />
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    selectedLanguage: state.language.selectedLanguage,
  };
};

const mapDispatchToProps = dispath => {
  return {
    onLanguageSelected: ({ code, name }) => dispath(actions.selectLanguage(code, name)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(languageChooser);