import React from 'react';
import { connect } from 'react-redux';

import classes from './WordCardControl.module.scss';

import ToggleButton from '../../../UI/ToggleButton/ToggleButton';
import ControlPanel from '../../../UI/ControlPanel/ControlPanel';
import * as actions from '../../../../store/actions/';

const wordCardControl = (props) => {
  const onExpansionToggled = () => {
    props.setEditMode(false);
  };
  const onEditToggled = () => {
      props.setEditMode(!props.editMode);
  };
  const entries = [{
    label: 'Edit',
    element: <ToggleButton checked={props.editMode} toggled={onEditToggled} />,
  }];
  return <ControlPanel 
    type='Right'
    className={classes.WordCardControl}
    onExpansionToggled={onExpansionToggled}
    entries={entries} />
};

const mapStateToProps = state => {
  return {
    editMode: state.dictionary.editMode,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setEditMode: (editMode) => dispatch(actions.setEditMode(editMode)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(wordCardControl);
