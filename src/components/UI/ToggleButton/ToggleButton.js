import React from 'react';
import PropTypes from 'prop-types';

import classes from './ToggleButton.module.scss';

const ToggleButton = props => {
  const classNames = [classes.Switch];
  props.className && classNames.push(props.className);

  return (
    <label className={classNames.join(' ')}>
      <input type='checkbox' checked={props.checked} onChange={props.toggled} />
      <span className={classes.Slider}></span>
    </label>
  );
};

ToggleButton.propTypes = {
  checked: PropTypes.bool.isRequired,
  toggled: PropTypes.func.isRequired,
};

export default ToggleButton;