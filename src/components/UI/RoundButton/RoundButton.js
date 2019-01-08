import React from 'react';
import _ from 'lodash';

import styles from './RoundButton.module.scss';

const roundButton = (props) => {
  const classes = [styles.RoundButton];
  if (props.classes) {
    _.concat(classes, props.classes);
  }
  return (
    <button className={classes.join(' ')} onClick={props.clicked}>{props.children}</button>
  );
}

export default roundButton;
