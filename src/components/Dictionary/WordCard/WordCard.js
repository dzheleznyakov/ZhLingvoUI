import React from 'react';
import { connect } from 'react-redux';

import classes from './WordCard.module.scss';

import WordCardControl from './WordCardControl/WordCardControl';
import WordCardOptions from './WordCardOptions/WordCardOptions';
import WordName from './WordName/WordName';
import Transcriptions from './Transcriptions/Transcriptions';
import SemanticBlock from './SemanticBlock/SemanticBlock';
import PlusButton from '../../UI/PlusButton/PlusButton';
import * as actions  from '../../../store/actions/';

const wordCard = (props) => {
  const entry = props.wordEntry;
  const { editMode } = props;

  let semanticBlocks = [];
  if (entry.semanticBlocks && entry.semanticBlocks.length) {
    semanticBlocks = entry.semanticBlocks
      .map((sb, i) => <SemanticBlock key={`sb${i}`} index={i} editMode={editMode} />)
  }
  if (editMode) {
    semanticBlocks.push(<div 
      key="addSB" 
      className={classes.PlusButtonWrapper}
    >
      <PlusButton clicked={props.createSemanticBlock} />
    </div>)
  }

  return (
    <div>
      <div className={classes.WordCardWrapper}>
        <WordCardControl />
        <div className={classes.WordCardContainer}>
          <WordCardOptions />
          <div className={classes.WordCardViewer}>
            <div className={classes.WordCard}>
              <WordName>{entry.word}</WordName>
              <Transcriptions transcriptions={entry.transcriptions} />
              {semanticBlocks}
            </div>
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
