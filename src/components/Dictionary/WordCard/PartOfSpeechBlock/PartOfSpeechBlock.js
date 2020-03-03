import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

import classes from './PartOfSpeechBlock.module.scss';

import Meanings from '../Meaning/Meanings';
import Examples from '../Examples/Examples';
import PromptSpan from '../../../UI/PromptSpan/PromptSpan';
import MinusButton from '../../../UI/MinusButton/MinusButton';
import * as actions from '../../../../store/actions/';

const POS_WITH_GENDER = ['NOUN'];

const PartOfSpeechBlock = props => {
  const editMode = useSelector(state => _.get(state, 'dictionary.editMode'));
  const posNamings = useSelector(state => _.get(state, 'language.languageConstants.pos'));
  const genderNamings = useSelector(state => _.get(state, 'language.languageConstants.genders'));
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

  const { branch } = props;
  const meaningEntries = meanings.map((meaning, i) => (
    <li className={classes.MeaningEntry} key={`m${i}`}>
      <Meanings 
        translations={meaning.translations} 
        remark={meaning.remark} 
        branch={{ ...branch, mIndex: i }} />
      <Examples 
        branch={{ ...branch, mIndex: i }} 
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

  const { partOfSpeech } = props;
  const currentGenderValue = props.gender || null;

  let gender;
  const pos = Object.keys(posNamings).filter(key => posNamings[key] === partOfSpeech)[0];
  const shouldHaveGender = POS_WITH_GENDER.indexOf(pos) >= 0;
  if (!shouldHaveGender) {
    gender = null;
  } else if (shouldHaveGender && !editMode) {
    gender = currentGenderValue;
  } else {
    const changed = event => dispatch(actions.editGender(branch, event.target.value));
    gender = (
      <select defaultValue={currentGenderValue || ''} onChange={changed}>
        <option></option>
        {Object.keys(genderNamings).map(key => (
          <option key={key}>{genderNamings[key]}</option>
        ))}
      </select>
    );
  }

  return (
    <li className={wrapperClasses.join(' ')}>
      <span className={classes.PartOfSpeech}>
        {partOfSpeech} 
        <span className={classes.Gender}> {gender}</span>
      </span>
      {partOfSpeechEdit}
      <ol className={classes.MeaningWrapper}>
        {meaningEntries}
      </ol>
    </li>
  )
};

export default PartOfSpeechBlock;