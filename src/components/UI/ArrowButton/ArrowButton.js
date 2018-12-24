import React from 'react';

import styles from './arrow-button.module.scss';

const arrowButton = (props) => {
  const arrowClasses=[styles['arrow']];
  if (props.open) {
    arrowClasses.push(styles['open']);
  }

  const buttonClasses = [styles['arrow-button']];
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
