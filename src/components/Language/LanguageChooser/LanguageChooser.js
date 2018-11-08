import React from 'react';
import { connect } from 'react-redux';

import Language from '../elements/Language';
import Dropdown from '../../UI/Dropdown/Dropdown';
import * as actions from '../../../store/actions/';

const languages = [
  { code: 'En', name: 'English' }, 
  { code: 'Es', name: 'Epañol' }, 
  { code: 'Ru', name: 'Русский' },
];

const languageChooser = (props) => {
  const options = languages.map(lang => {
    return (
      <Language 
        key={lang.code}
        onclicked={() => props.onLanguageSelected(lang)}
        code={lang.code}
        name={lang.name}
        size='Medium'
      />
    );
  });

  const currentLanguage = props.selectedLanguage;
  let currentLanguageMessage = <div>No language selected</div>;
  if (currentLanguage) {
    currentLanguageMessage = (<div>
      Selected language:
      <Language 
        code={currentLanguage.code}
        name={currentLanguage.name}
        size='Medium'
      />
    </div>);
  }
  
  
  // currentLanguageName
  //   ? <div>Selected language: ${currentLanguageName}</div>
  //   : 'No language selected';

  return (
    <React.Fragment>
      {currentLanguageMessage}
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