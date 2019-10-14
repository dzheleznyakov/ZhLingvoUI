import React from 'react';
import _ from 'lodash';

import classes from './MinusButton.module.scss';

const minusButton = (props) => {
  const size = props.size || 'small';
  let classNames = [classes.MinusButton, classes[size], props.classes];
  classNames = _.compact(classNames);
  return (
    <button className={classNames.join(' ')} onClick={props.clicked} />
  );
}

export default minusButton;