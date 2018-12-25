import React from 'react';
import { connect } from 'react-redux';

import styles from './word-card.module.scss';

import WordCardControl from './WordCardControl/WordCardControl';
import WordName from './WordName/WordName';
import SemanticBlock from './SemanticBlock/SemanticBlock';
import * as actions  from '../../../store/actions/';

const wordCard = (props) => {
  const entry = props.wordEntry;

  let transcriptions = null;
  if (entry.transcriptions && entry.transcriptions.length) {
    transcriptions = (<span className={styles['transcription']}>
      {entry.transcriptions.map(tr => `[${tr}]`).join(' ')}
    </span>);
  }

  let semanticBlocks = null;
  if (entry.semanticBlocks && entry.semanticBlocks.length) {
    semanticBlocks = entry.semanticBlocks
      .map((sb, i) => <SemanticBlock key={i} num={i + 1} block={sb} />)
  }

  const onWordEdited = (value) => {
    props.editWordName(value);
  };

  return (
    <div>
      <div className={styles['word-card-wrapper']}>
        <WordCardControl />
        <div className={styles['word-card-container']}>
          <div className={styles['word-card']}>
            <WordName 
              className={styles['word']}
              editMode={props.editMode} 
              edited={onWordEdited}
            >{entry.word}</WordName>
            {transcriptions}
            {semanticBlocks}
          </div>
        </div>
      </div>
    </div>
  )
};

const mapStateToProps = state => {
  return {
    editMode: state.dictionary.editMode,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    editWordName: (wordName) => dispatch(actions.editWordName(wordName)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(wordCard);
