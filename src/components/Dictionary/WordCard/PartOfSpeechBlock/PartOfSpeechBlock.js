import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

import classes from './PartOfSpeechBlock.module.scss';

import Meanings from '../Meaning/Meanings';
import Examples from '../Examples/Examples';
import PromptSpan from '../../../UI/PromptSpan/PromptSpan';
import MinusButton from '../../../UI/MinusButton/MinusButton';
import * as actions from '../../../../store/actions/';

const PartOfSpeechBlock = props => {
  const editMode = useSelector(state => _.get(state, 'dictionary.editMode'));
  const dispatch = useDispatch();

  const wrapperClasses = [classes.PartOfSpeechWrapper];
  if (editMode) {
    wrapperClasses.push(classes.EditMode);
  }

  const meanings = props.meanings || [];

  let partOfSpeechEdit = null
  if (editMode) {
    const posRemoveButton = <MinusButton
      clicked={() => dispatch(actions.deletePartOfSpeech(props.branch.sbIndex, props.partOfSpeech))}
    />;
    partOfSpeechEdit = (
      <div className={classes.PartOfSpeechEdit}>
        {posRemoveButton}
      </div>
    );
  }

  const meaningEntries = meanings.map((meaning, i) => (
    <li className={classes.MeaningEntry} key={`m${i}`}>
      <Meanings 
        translations={meaning.translations} 
        remark={meaning.remark} 
        branch={{ ...props.branch, mIndex: i }} />
      <Examples 
        branch={{ ...props.branch, mIndex: i }} 
        index={i} 
        examples={meaning.examples} />
    </li>
  ));

  if (editMode) {
    const index = meaningEntries.length;
    meaningEntries.push((
      <li className={classes.MeaningEntry} key={`m${index}`}>
        <PromptSpan edited={translation => dispatch(actions.createMeaning(props.branch, translation))}/>
      </li>
    ));
  }

  return (
    <li className={wrapperClasses.join(' ')}>
      <span className={classes.PartOfSpeech}>{props.partOfSpeech}</span>
      {partOfSpeechEdit}
      <ol className={classes.MeaningWrapper}>
        {meaningEntries}
      </ol>
    </li>
  )
};

export default PartOfSpeechBlock;