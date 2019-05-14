import React from 'react';

import classes from './DialogPanel.module.scss';

import Button from '../Button/Button';

const dialogPanel = (props) => (
  <div className={classes.DialogPanel}>
    {props.children}
    <div className={classes.ButtonPane}>
      <Button btnType={'Danger'} clicked={props.canceled}>Cancel</Button>
      <Button btnType={'Success'} clicked={props.confirmed}>OK</Button>
    </div>
  </div>
);

export default dialogPanel;
