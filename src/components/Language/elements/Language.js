import React from 'react';

import styles from './Language.module.css';

import LanguageIcon from './LanguageIcon';

const language = (props) => (
  <div className={styles.Language}>
    <div className={styles.LanguageInternal}>
      <LanguageIcon size={props.size}>{props.code}</LanguageIcon>
      <div className={styles[props.size]}>{props.name}</div>
    </div>
  </div>
);

export default language;