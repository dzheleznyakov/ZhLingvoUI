import React from 'react';
import { useDispatch } from 'react-redux';

import classes from './WordName.module.scss';

import EditableSpan from '../../../UI/EditableSpan/EditableSpan';
import * as actions from '../../../../store/actions/';

const wordName = (props) => {
  const dispatch = useDispatch();

  return (
    <EditableSpan 
      cssClasses={classes.WordName}
      value={props.children}
      edited={wordName => dispatch(actions.editWordName(wordName))} />
  );
};

export default wordName;
