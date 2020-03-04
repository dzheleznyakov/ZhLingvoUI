import React from 'react';
import { useDispatch } from 'react-redux';

import classes from './WordFormsWrapper.module.scss';

import useSelectEditMode from '../../../../../hooks/useSelectEditMode';
import ToggleButton from '../../../../UI/ToggleButton/ToggleButton';
import * as actions from '../../../../../store/actions';

const WordFormsWrapper = props => {
  const dispatch = useDispatch();
  const editMode = useSelectEditMode();
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
