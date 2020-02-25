import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';

import classes from './WordCard.module.scss';

import WordCardControl from './WordCardControl/WordCardControl';
import WordCardOptions from './WordCardOptions/WordCardOptions';
import WordName from './WordName/WordName';
import Transcriptions from './Transcriptions/Transcriptions';
import SemanticBlock from './SemanticBlock/SemanticBlock';
import PlusButton from '../../UI/PlusButton/PlusButton';
import * as actions  from '../../../store/actions/';

const WordCard = (props) => {
  const editMode = useSelector(state => _.get(state, 'dictionary.editMode'));
  const dispatch = useDispatch();

  const entry = props.wordEntry;

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
      <PlusButton clicked={() => dispatch(actions.createSemanticBlock())} />
    </div>)
  }

  const transcriptions = entry.transcriptions && entry.transcriptions.length
    ? <Transcriptions transcriptions={entry.transcriptions} />
    : null;

  return (
    <div>
      <div className={classes.WordCardWrapper}>
        <WordCardControl />
        <div className={classes.WordCardContainer}>
          <WordCardOptions />
          <div className={classes.WordCardViewer}>
            <div className={classes.WordCard}>
              <WordName>{entry.word}</WordName>
              {transcriptions}
              {semanticBlocks}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default WordCard;
