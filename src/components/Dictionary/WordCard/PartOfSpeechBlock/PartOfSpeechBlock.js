import React from 'react';
import { connect } from 'react-redux';

import styles from './PartOfSpeechBlock.module.scss';
import { updateObject } from '../../../../utils/utils';

import Meanings from '../Meaning/Meanings';
import Examples from '../Examples/Examples';
import MinusButton from '../../../UI/MinusButton/MinusButton';
import * as actions from '../../../../store/actions/';

const partOfSpeechBlock = (props) => {
  const wrapperClasses = [styles.PartOfSpeechWrapper];
  if (props.editMode) {
    wrapperClasses.push(styles.EditMode);
  }

  const meanings = props.meanings || [];

  let partOfSpeechMinusButton = null
  if (props.editMode) {
    partOfSpeechMinusButton = <MinusButton 
      classes={styles.MinusButton}
      clicked={() => props.removePartOfSpeech(props.branch.sbIndex, props.partOfSpeech)}
    />;
  }

  const updatedBranch = updateObject(props.branch, { posIndex: props.index });

  return (
    <li className={wrapperClasses.join(' ')}>
      <span className={styles.PartOfSpeech}>{props.partOfSpeech}</span>
      {partOfSpeechMinusButton}
      <ol className={styles.MeaningWrapper}>
        {meanings.map((meaning, i) => (
          <li key={`m${i}`}>
            <Meanings 
              translations={meaning.translations} 
              remark={meaning.remark} 
              index={i}
              branch={updatedBranch} />
            <Examples examples={meaning.examples} />
          </li>
        ))}
      </ol>
    </li>
  )
};

const mapStateToProps = state => {
  return {
    editMode: state.dictionary.editMode,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removePartOfSpeech: (sbIndex, partOfSpeech) => dispatch(actions.removePartOfSpeechAndSaveDictionary(sbIndex, partOfSpeech)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(partOfSpeechBlock);