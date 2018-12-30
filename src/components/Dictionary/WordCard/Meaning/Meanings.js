import React from 'react';
import { connect } from 'react-redux';

import styles from './Meanings.module.scss';

import Remark from '../Remark/Remark';
import * as actions from '../../../../store/actions/';

const meanings = (props) => {
  const { sbIndex, posIndex } = props.branch;
  const remark = props.remark ? <Remark 
    key={'remark'}
    editMode={props.editMode}
    edited={(remark) => props.editRemark({ sbIndex, posIndex, mIndex: props.index }, remark)}
  >{props.remark}</Remark> : null;

  let meaning = null;
  if (props.translations) {
    meaning = props.translations.reduce((arr, { translation, elaboration }, index, tArray) => {
      const length = tArray.length;
      const span = (<span key={`t${index}`}>
        {translation}
        <span className={styles.elaboration}>{elaboration ? ` (${elaboration})` : ''}</span>
        {index < length - 1 ? '; ' : ''}
      </span>);
      arr.push(span);
      return arr;
    }, (remark ? [remark] : []));
  }
  
  return <span>{meaning}</span>;
};

const mapStateToProps = state => {
  return {
    editMode: state.dictionary.editMode,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    editRemark: (branch, remark) => dispatch(actions.editMeaningRemark(branch, remark)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(meanings);
