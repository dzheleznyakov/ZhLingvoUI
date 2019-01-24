import React from 'react';
import _ from 'lodash';

import styles from './MinusButton.module.scss';

const minusButton = (props) => {
  const size = props.size || 'small';
  let classes = [styles.MinusButton, styles[size], props.classes];
  classes = _.compact(classes);
  return (
    <button className={classes.join(' ')} onClick={props.clicked} />
  );
}

export default minusButton;