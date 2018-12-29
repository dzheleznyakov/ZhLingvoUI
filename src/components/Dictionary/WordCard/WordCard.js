import React from 'react';
import { connect } from 'react-redux';

import styles from './word-card.module.scss';

import WordCardControl from './WordCardControl/WordCardControl';
import WordName from './WordName/WordName';
import Transcription from './Transcription/Transcription';
import SemanticBlock from './SemanticBlock/SemanticBlock';
import PlusButton from '../../UI/PlusButton/PlusButton';
import * as actions  from '../../../store/actions/';

const wordCard = (props) => {
  const entry = props.wordEntry;

  let transcriptions = null;
  if (entry.transcriptions && entry.transcriptions.length) {
    const transcriptionEdited = (index) => (value) => props.editTranscription(value, index);
    transcriptions = (
      <span className={styles['transcriptions']}>
        {entry.transcriptions.map((tr, i) => 
          <span key={`tr${i}`}>
            [<Transcription editMode={props.editMode} edited={transcriptionEdited(i)}>
              {tr}
            </Transcription>]{' '}
          </span>)}
      </span>
    );
  }

  let semanticBlocks = [];
  if (entry.semanticBlocks && entry.semanticBlocks.length) {
    semanticBlocks = entry.semanticBlocks
      .map((sb, i) => <SemanticBlock key={i} index={i} editMode={props.editMode} />)
  }
  if (props.editMode) {
    semanticBlocks.push(<div 
      key="addSB" 
      className={styles['plus-button-wrapper']}
    >
      <PlusButton clicked={props.createSemanticBlock} />
    </div>)
  }

  return (
    <div>
      <div className={styles['word-card-wrapper']}>
        <WordCardControl />
        <div className={styles['word-card-container']}>
          <div className={styles['word-card']}>
            <WordName 
              className={styles['word']} 
              editMode={props.editMode} 
              edited={props.editWordName}
            >
              {entry.word}
            </WordName>
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
    editTranscription: (transcription, index) => dispatch(actions.editTranscription(transcription, index)),
    createSemanticBlock: () => dispatch(actions.createSemanticBlock()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(wordCard);
