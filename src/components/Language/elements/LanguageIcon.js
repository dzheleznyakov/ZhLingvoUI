import React from 'react';

import styles from './LanguageIcon.module.css';

const languageIcon = (props) => {
  const style = { 
    color: props.color || 'black',
    borderColor: props.color || 'black',
  };

  const classNames = [styles.LanguageIcon, styles[props.size]];

  return (
    <div 
      className={classNames.join(' ')}
      style={style}
    >{props.children}</div>
  )
};

export default languageIcon;