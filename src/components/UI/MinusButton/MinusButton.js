import React from 'react';

import styles from './MinusButton.module.scss';

const minusButton = (props) => {
  const classes = [styles.MinusButton];
  if (props.classes) {
    classes.push(props.classes)
  }
  return (
    <button className={classes.join(' ')} onClick={props.clicked} />
  );
}

export default minusButton;