import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

import classes from './WordCardControl.module.scss';

import ToggleButton from '../../../UI/ToggleButton/ToggleButton';
import ControlPanel from '../../../UI/ControlPanel/ControlPanel';
import * as actions from '../../../../store/actions/';

const WordCardControl = (props) => {
  const editMode = useSelector(state => _.get(state, 'dictionary.editMode'));
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
