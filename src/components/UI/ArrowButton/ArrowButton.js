import React from 'react';

import classes from './ArrowButton.module.scss';

const arrowButton = (props) => {
  const arrowClasses=[classes.Arrow];
  if (props.open) {
    arrowClasses.push(classes.Open);
  }

  const buttonClasses = [classes.ArrowButton];
  if (props.buttonStyle) {
    buttonClasses.push(props.buttonStyle);
  }

  return (
    <button
      className={buttonClasses.join(' ')}
      onClick={props.clicked}
    >
      <div className={arrowClasses.join(' ')}></div>
    </button>
  );
}

export default arrowButton;
