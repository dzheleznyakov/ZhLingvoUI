import React from 'react';
import { connect } from 'react-redux';

import styles from './PartOfSpeechBlock.module.scss';

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
      clicked={() => props.removePartOfSpeech(props.sbIndex, props.partOfSpeech)}
    />;
  }

  return (
    <li className={wrapperClasses.join(' ')}>
      <span className={styles.PartOfSpeech}>{props.partOfSpeech}</span>
      {partOfSpeechMinusButton}
      <ol className={styles.MeaningWrapper}>
        {meanings.map((meaning, i) => (
          <li key={`m${i}`}>
            <Meanings translations={meaning.translations} remark={meaning.remark} />
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