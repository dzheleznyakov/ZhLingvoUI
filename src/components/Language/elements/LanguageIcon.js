import React from 'react';

import classes from './LanguageIcon.module.scss';

const languageIcon = (props) => {
  const style = { 
    color: props.color || 'black',
    borderColor: props.color || 'black',
  };

  const classNames = [classes.LanguageIcon, classes[props.size]];

  return (
    <div 
      className={classNames.join(' ')}
      style={style}
    >{props.children}</div>
  )
};

export default languageIcon;