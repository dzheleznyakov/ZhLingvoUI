import React from 'react';
import { connect } from 'react-redux';

import classes from './Meanings.module.scss';

import Remark from '../Remark/Remark';
import Translation from '../Translation/Translation';
import Elaboration from '../Elaboration/Elaboration';
import PromptSpan from '../../../UI/PromptSpan/PromptSpan';
import * as actions from '../../../../store/actions/';

const meanings = (props) => {
  const remark = props.remark ? (
    <Remark 
      key='remark'
      edited={(remark) => props.editRemark(props.branch, remark)}
      postfix=' '>{props.remark}
    </Remark>
   ) : props.editMode ? (
     <PromptSpan 
      key='remark' 
      cssClasses={classes.RemarkPlaceholder}
      edited={(newRemark) => props.editRemark(props.branch, newRemark)} 
      postfix=' ' 
      placeholder='##' />
   ) : null;

  const onTranslationEdited = (index) => (value) => props.editTranslation(props.branch, index, value);
  const onElaborationEdited = (index) => (value) => props.editElaboration(props.branch, index, value);
  let meaning = [];
  if (props.translations) {    
    const getElaboration = (elaboration, index) => (
      elaboration ? (
        <Elaboration edited={onElaborationEdited(index)}>{elaboration}</Elaboration> 
      ) : props.editMode ? (
        <PromptSpan
          cssClasses={classes.ElaborationPlaceholder}
          edited={onElaborationEdited(index)}
          prefix=" ("
          postfix=")" />
      ) : null
    );

    meaning = props.translations.reduce((arr, { translation, elaboration }, index, tArray) => {
      const length = tArray.length;
      const span = (<span key={`t${index}`}>
        <Translation edited={onTranslationEdited(index)}>{translation}</Translation>
        {getElaboration(elaboration, index)}
        {index < length - 1 ? '; ' : ''}
      </span>);
      arr.push(span);
      return arr;
    }, (remark ? [remark] : []));
  }

  if (props.editMode) {
    const index = props.translations.length;
    meaning.push((
      <span key='prompt-translation'>
        {'; '}
        <PromptSpan edited={onTranslationEdited(index)} />
      </span>
    ));
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
