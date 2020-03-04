import React from 'react';
import { useDispatch } from 'react-redux';

import classes from './WordCardControl.module.scss';

import useSelectEditMode from '../../../../hooks/useSelectEditMode';
import ToggleButton from '../../../UI/ToggleButton/ToggleButton';
import ControlPanel from '../../../UI/ControlPanel/ControlPanel';
import * as actions from '../../../../store/actions/';

const WordCardControl = () => {
  const editMode = useSelectEditMode();
  const dispatch = useDispatch();

  const setEditMode = value => dispatch(actions.setEditMode(value));

  const onExpansionToggled = () => setEditMode(false);
  const onEditToggled = () => setEditMode(!editMode);
  const entries = [{
    label: 'Edit',
    element: <ToggleButton checked={editMode} toggled={onEditToggled} />,
  }];
  return <ControlPanel 
    type='Right'
    className={classes.WordCardControl}
    onExpansionToggled={onExpansionToggled}
    entries={entries} />
};

export default WordCardControl;
