import React from 'react';
import { connect } from 'react-redux';

import classes from './WordName.module.scss';

import EditableSpan from '../../../UI/EditableSpan/EditableSpan';
import * as actions from '../../../../store/actions/';

const wordName = (props) => <EditableSpan 
  cssClasses={classes.WordName}
  value={props.children}
  edited={props.editWordName} />;

const mapDispatchToProps = dispatch => ({
  editWordName: (wordName) => dispatch(actions.editWordName(wordName)),
});

export default connect(null, mapDispatchToProps)(wordName);
