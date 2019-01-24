import React from 'react';
import _ from 'lodash';

import styles from './PlusButton.module.scss';

const plusButton = (props) => {
  const size = props.size || 'large';
  let classes = [styles.PlusButton, styles[size], props.classes];
  classes = _.compact(classes);
  return (
    <button className={classes.join(' ')} onClick={props.clicked} />
  );
};

export default plusButton;