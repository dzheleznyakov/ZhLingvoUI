import React from 'react';
import { connect } from 'react-redux';

import styles from './WordCard.module.scss';

import WordCardControl from './WordCardControl/WordCardControl';
import WordName from './WordName/WordName';
import Transcriptions from './Transcriptions/Transcriptions';
import SemanticBlock from './SemanticBlock/SemanticBlock';
import PlusButton from '../../UI/PlusButton/PlusButton';
import * as actions  from '../../../store/actions/';

const wordCard = (props) => {
  const entry = props.wordEntry;

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
            <WordName>{entry.word}</WordName>
            <Transcriptions transcriptions={entry.transcriptions} />
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
    createSemanticBlock: () => dispatch(actions.createSemanticBlock()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(wordCard);
