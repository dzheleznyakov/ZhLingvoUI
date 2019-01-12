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

  let partOfSpeechEdit = null
  if (props.editMode) {
    const posRemoveButton = <MinusButton 
      clicked={() => props.removePartOfSpeech(props.branch.sbIndex, props.partOfSpeech)}
    />;
    partOfSpeechEdit = (
      <div className={styles.PartOfSpeechEdit}>
        {posRemoveButton}
      </div>
    );
  }

  const updatedBranch = updateObject(props.branch, { posIndex: props.index });
  const meaningEntries = meanings.map((meaning, i) => (
    <li className={styles.MeaningEntry} key={`m${i}`}>
      <Meanings 
        translations={meaning.translations} 
        remark={meaning.remark} 
        index={i}
        branch={updatedBranch} />
      <Examples examples={meaning.examples} />
    </li>
  ));

  return (
    <li className={wrapperClasses.join(' ')}>
      <span className={styles.PartOfSpeech}>{props.partOfSpeech}</span>
      {partOfSpeechEdit}
      <ol className={styles.MeaningWrapper}>
        {meaningEntries}
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