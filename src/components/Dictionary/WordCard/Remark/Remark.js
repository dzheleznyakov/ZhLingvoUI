import React from 'react';

import classes from './Remark.module.scss';

import EditableSpan from '../../../UI/EditableSpan/EditableSpan';

const remark = (props) => <EditableSpan
  cssClasses={classes.Remark}
  value={props.children}
  edited={props.edited} />

export default remark;
