import React from 'react';
import { connect } from 'react-redux';

import Remark from '../Remark/Remark';
import Translation from '../Translation/Translation';
import Elaboration from '../Elaboration/Elaboration';
import * as actions from '../../../../store/actions/';

const meanings = (props) => {
  const remark = props.remark ? <Remark 
    key={'remark'}
    edited={(remark) => props.editRemark(props.branch, remark)}
    postfix=' '>{props.remark}</Remark> : null;

  let meaning = null;
  if (props.translations) {
    const onTranslationEdited = (index) => (value) => props.editTranslation(props.branch, index, value);
    const onElaborationEdited = (index) => (value) => props.editElaboration(props.branch, index, value);

    meaning = props.translations.reduce((arr, { translation, elaboration }, index, tArray) => {
      const length = tArray.length;
      const span = (<span key={`t${index}`}>
        <Translation edited={onTranslationEdited(index)}>{translation}</Translation>
        {elaboration 
          ? <Elaboration edited={onElaborationEdited(index)}>{elaboration}</Elaboration> 
          : null}
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
    editTranslation: (branch, index, translation) => dispatch(actions.editTranslation(branch, index, translation)),
    editElaboration: (branch, index, elaboration) => dispatch(actions.editElaboration(branch, index, elaboration)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(meanings);
