import React from 'react';
import { connect } from 'react-redux';

import styles from './PartOfSpeechBlock.module.scss';

import Meanings from '../Meaning/Meanings';
import Examples from '../Examples/Examples';
import PromptSpan from '../../../UI/PromptSpan/PromptSpan';
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

  const meaningEntries = meanings.map((meaning, i) => (
    <li className={styles.MeaningEntry} key={`m${i}`}>
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

  if (props.editMode) {
    const index = meaningEntries.length;
    meaningEntries.push((
      <li className={styles.MeaningEntry} key={`m${index}`}>
        <PromptSpan edited={translation => props.createMeaning(props.branch, translation)}/>
      </li>
    ));
  }

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

const mapStateToProps = state => ({
    editMode: state.dictionary.editMode,
});

const mapDispatchToProps = dispatch => ({
    removePartOfSpeech: (sbIndex, partOfSpeech) => dispatch(actions.removePartOfSpeechAndSaveDictionary(sbIndex, partOfSpeech)),
    createMeaning: (branch, translation) => dispatch(actions.createMeaning(branch, translation)),
});

export default connect(mapStateToProps, mapDispatchToProps)(partOfSpeechBlock);