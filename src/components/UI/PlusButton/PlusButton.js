import React from 'react';
import _ from 'lodash';

import classes from './PlusButton.module.scss';

const plusButton = (props) => {
  const size = props.size || 'large';
  let classNames = [classes.PlusButton, classes[size], props.classes];
  classNames = _.compact(classNames);
  return (
    <button className={classNames.join(' ')} onClick={props.clicked} />
  );
};

export default plusButton;