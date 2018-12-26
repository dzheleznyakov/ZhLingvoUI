import React from 'react';
import { connect } from 'react-redux';

import styles from './SemanticBlock.module.scss';

import { toRoman } from '../../../../utils/utils';
import PartOfSpeechBlock from './PartOfSpeechBlock/PartOfSpeechBlock';
import MinusButton from '../../../UI/MinusButton/MinusButton';
import * as actions from '../../../../store/actions/';

const semanticBlocks = (props) => {
  const partOfSpeechesBlocks = (
    <ol className={styles.PartOfSpeechBlockList}>
      {Object.keys(props.block).map((key, i) => 
        <PartOfSpeechBlock key={key} partOfSpeech={key} index={i + 1} meanings={props.block[key].meanings} />)}
    </ol>
  );

  let semanticBlockMinusButton = null
  if (props.editMode) {
    semanticBlockMinusButton = <MinusButton 
      classes={styles.MinusButton}
      clicked={() => props.removeSemanticBlock(props.num - 1)}
    />;
  }

  const classes = [styles.SemanticBlock];
  if (props.editMode) {
    classes.push(styles.active);
  }

  return (
    <div className={classes.join(' ')}>
      <span className={styles.BlockNumber}>{toRoman(props.num)}</span>
      {semanticBlockMinusButton}
      {partOfSpeechesBlocks}
    </div>
  )
};

const mapDispatchToProps = dispatch => {
  return {
    removeSemanticBlock: (index) => dispatch(actions.removeSemanticBlockAndSaveDictionary(index)),
  };
};

export default connect(null, mapDispatchToProps)(semanticBlocks);
