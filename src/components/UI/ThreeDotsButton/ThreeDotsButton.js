import React from 'react';

import classes from './ThreeDotsButton.module.scss';

const threeDotsButton = (props) => {
  const classNames = [classes.ThreeDotsButton];
  if (props.classes) {
    classNames.push(props.classes);
  }
  return (
    <button className={classNames.join(' ')} onClick={props.clicked}>
      <div className={classes.Dot} />
      <div className={classes.Dot} />
      <div className={classes.Dot} />
    </button>
  );
};

export default threeDotsButton;