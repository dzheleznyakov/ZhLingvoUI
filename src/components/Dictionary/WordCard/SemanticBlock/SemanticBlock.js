import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';

import classes from './SemanticBlock.module.scss';

import { toRoman } from '../../../../utils/utils';
import PartOfSpeechBlock from '../PartOfSpeechBlock/PartOfSpeechBlock';
import PartOfSpeechesExpansion from '../PartOfSpeechesExpansion/PartOfSpeechesExpansion';
import MinusButton from '../../../UI/MinusButton/MinusButton';
import * as actions from '../../../../store/actions/';

const SemanticBlock = props => {
  const fetchedWord = useSelector(state => _.get(state, 'dictionary.fetchedWord'));
  const editMode = useSelector(state => _.get(state, 'dictionary.editMode'));
  const dispatch = useDispatch();

  const block = fetchedWord.semanticBlocks[props.index];
  const partOfSpeeches = block.map((pos, i) => 
    <PartOfSpeechBlock 
      key={pos.type} 
      partOfSpeech={pos.type} 
      gender={pos.gender}
      branch={{ sbIndex: props.index, posIndex: i }}
      meanings={pos.meanings} 
    />
  );
  if (editMode) {
    partOfSpeeches.push(<PartOfSpeechesExpansion 
      key='3_dots_btn' 
      setPartsOfSpeech={block.map(pos => pos.type)}
      semanticBlockIndex={props.index}
    />);
  }
  const partOfSpeechBlocks = (
    <ol className={classes.PartOfSpeechBlockList}>
      {partOfSpeeches}
    </ol>
  );

  let semanticBlockMinusButton = null
  if (editMode) {
    semanticBlockMinusButton = <MinusButton 
      classes={classes.MinusButton}
      clicked={() => dispatch(actions.deleteSemanticBlock(props.index))}
    />;
  }

  const classNames = [classes.SemanticBlock];
  if (editMode) {
    classNames.push(classes.active);
  }

  return (
    <div className={classNames.join(' ')}>
      <span className={classes.BlockNumber}>{toRoman(props.index + 1)}</span>
      {semanticBlockMinusButton}
      {partOfSpeechBlocks}
    </div>
  )
};

export default SemanticBlock;
