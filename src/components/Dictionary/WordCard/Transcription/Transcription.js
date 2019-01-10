import React from 'react';

import EditableSpan from '../../../UI/EditableSpan/EditableSpan';
import classes from './transcription.module.scss';

const transcription = (props) => <EditableSpan
  cssClasses={classes.Transcription}
  value={props.children}
  edited={props.edited} />;

export default transcription;
