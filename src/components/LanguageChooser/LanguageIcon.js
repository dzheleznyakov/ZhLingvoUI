import React from 'react';

import styles from './LanguageIcon.module.css';

const languageIcon = (props) => {
  const style = { 
    fontSize: props.fontSize ,
    color: props.color || 'black',
    borderColor: props.color || 'black',
  };

  return (
    <div 
      className={styles.LanguageIcon}
      style={style}
    >{props.children}</div>
  )
};

export default languageIcon;