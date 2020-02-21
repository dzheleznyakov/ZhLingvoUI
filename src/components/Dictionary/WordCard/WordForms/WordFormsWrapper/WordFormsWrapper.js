import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';

import classes from './WordFormsWrapper.module.scss';

import ToggleButton from '../../../../UI/ToggleButton/ToggleButton';
import * as actions from '../../../../../store/actions';

const WordFormsWrapper = props => {
  const dispatch = useDispatch();
  const editMode = useSelector(state => _.get(state, 'dictionary.editMode'));
  const setEditMode = () => dispatch(actions.setEditMode(!editMode));

  return (
    <div
      className={classes.WordFormsWrapper}
    >
      <ToggleButton className={classes.ToggleButton} checked={editMode} toggled={setEditMode} />
      {props.children}
    </div>);
};

export default WordFormsWrapper;
