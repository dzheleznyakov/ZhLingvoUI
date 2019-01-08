import React from 'react';
import { connect } from 'react-redux';

import styles from './SemanticBlock.module.scss';

import { toRoman } from '../../../../utils/utils';
import PartOfSpeechBlock from '../PartOfSpeechBlock/PartOfSpeechBlock';
import PartOfSpeechesExpansion from '../PartOfSpeechesExpansion/PartOfSpeechesExpansion';
import MinusButton from '../../../UI/MinusButton/MinusButton';
import * as actions from '../../../../store/actions/';

const semanticBlock = (props) => {
  const block = props.loadedDictionary[props.wordIndex].semanticBlocks[props.index];
  const partOfSpeeches = block.map((pos, i) => 
    <PartOfSpeechBlock 
      key={pos.type} 
      partOfSpeech={pos.type} 
      index={i} 
      branch={{ sbIndex: props.index }}
      meanings={pos.meanings} 
    />
  );
  if (props.editMode) {
    partOfSpeeches.push(<PartOfSpeechesExpansion 
      key='3_dots_btn' 
      setPartsOfSpeech={block.map(pos => pos.type)}
      semanticBlockIndex={props.index}
    />);
  }
  const partOfSpeechBlocks = (
    <ol className={styles.PartOfSpeechBlockList}>
      {partOfSpeeches}
    </ol>
  );

  let semanticBlockMinusButton = null
  if (props.editMode) {
    semanticBlockMinusButton = <MinusButton 
      classes={styles.MinusButton}
      clicked={() => props.removeSemanticBlock(props.index)}
    />;
  }

  const classes = [styles.SemanticBlock];
  if (props.editMode) {
    classes.push(styles.active);
  }

  return (
    <div className={classes.join(' ')}>
      <span className={styles.BlockNumber}>{toRoman(props.index + 1)}</span>
      {semanticBlockMinusButton}
      {partOfSpeechBlocks}
    </div>
  )
};

const mapStateToProps = state => {
  return {
    loadedDictionary: state.dictionary.loadedDictionary,
    wordIndex: state.dictionary.selectedWordIndex,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeSemanticBlock: (index) => dispatch(actions.removeSemanticBlockAndSaveDictionary(index)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(semanticBlock);
