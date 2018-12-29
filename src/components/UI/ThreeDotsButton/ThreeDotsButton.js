import React from 'react';

import styles from './ThreeDotsButton.module.scss';

const threeDotsButton = (props) => {
  const classes = [styles.ThreeDotsButton];
  if (props.classes) {
    classes.push(props.classes);
  }
  return (
    <button className={classes.join(' ')} onClick={props.clicked}>
      <div className={styles.dot} />
      <div className={styles.dot} />
      <div className={styles.dot} />
    </button>
  );
};

export default threeDotsButton;