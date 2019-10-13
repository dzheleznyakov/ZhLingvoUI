import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';

import classes from './Meanings.module.scss';

import Remark from '../Remark/Remark';
import Translation from '../Translation/Translation';
import Elaboration from '../Elaboration/Elaboration';
import PromptSpan from '../../../UI/PromptSpan/PromptSpan';
import * as actions from '../../../../store/actions/';

const Meanings = (props) => {
  const editMode = useSelector(state => _.get(state, 'dictionary.editMode'));
  const dispatch = useDispatch();

  const { branch } = props;
  const onRemarkEdited = remark => dispatch(actions.editMeaningRemark(branch, remark));
  const onTranslationEdited = index => translation => dispatch(actions.editTranslation(branch, index, translation));
  const onElaborationEdited = index => elaboration => dispatch(actions.editElaboration(branch, index, elaboration));
  
  const remark = props.remark ? (
    <Remark 
      key='remark'
      edited={onRemarkEdited}
      postfix=' '
    >
      {props.remark}
    </Remark>
   ) : editMode ? (
     <PromptSpan 
      key='remark' 
      cssClasses={classes.RemarkPlaceholder}
      edited={onRemarkEdited} 
      postfix=' ' 
      placeholder='##' />
   ) : null;

  let meaning = [];
  if (props.translations) {    
    const getElaboration = (elaboration, index) => (
      elaboration ? (
        <Elaboration edited={onElaborationEdited(index)}>{elaboration}</Elaboration> 
      ) : editMode ? (
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

  if (editMode) {
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

export default Meanings;
