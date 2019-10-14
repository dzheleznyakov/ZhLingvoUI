import React from 'react';

import classes from './ToggleButton.module.scss';

const toggleButton = (props) => (
  <label className={classes.Switch}>
    <input type='checkbox' checked={props.checked} onChange={props.toggled} />
    <span className={classes.Slider}></span>
  </label>
);

export default toggleButton;