import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

import Language from '../elements/Language';
import Dropdown from '../../UI/Dropdown/Dropdown';
import Spinner from '../../UI/Spinner/Spinner';
import * as actions from '../../../store/actions/';
import styles from './LanguageChooser.module.css';

const languageChooser = props => {
  const dispath = useDispatch();

  const languages = useSelector(state => _.get(state, 'language.languages', []));
  const selectedLanguage = useSelector(state => _.get(state, 'language.selectedLanguage'));

  useEffect(() => {
    dispath(actions.loadLanguages());
  }, []);

  let dropdown = <Spinner />;
  if (languages.length) {
    const options = languages.map(lang => {
      return (
        <Language 
          key={lang.code}
          onclicked={() => dispath(actions.selectLanguage(lang.code, lang.name))}
          code={lang.code}
          name={lang.name}
          size='Medium'
        />
      );
    });
    dropdown = <Dropdown options={options} select='language' />
  }

  let currentLanguageMessage = <div>No language selected</div>;
  if (selectedLanguage) {
    currentLanguageMessage = (<div>
      Selected language:
      <Language 
        code={selectedLanguage.code}
        name={selectedLanguage.name}
        size='Medium'
      />
    </div>);
  }

  return (
    <div className={styles.LanguageChooser}>
      {currentLanguageMessage}
      {dropdown}
    </div>
  );
};

export default languageChooser;