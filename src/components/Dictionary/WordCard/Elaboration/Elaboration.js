import React from 'react';

import classes from './Elaboration.module.scss';

import EditableSpan from '../../../UI/EditableSpan/EditableSpan';

const elaboration = (props) => <EditableSpan
  cssClasses={classes.Elaboration}
  value={props.children}
  edited={props.edited}
  prefix=' ('
  postfix=')' />;

export default elaboration;
