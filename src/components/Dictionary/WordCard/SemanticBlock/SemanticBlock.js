import React from 'react';

import styles from './SemanticBlock.module.scss';

import { toRoman } from '../../../../utils/utils';
import PartOfSpeechBlock from './PartOfSpeechBlock/PartOfSpeechBlock';

const semanticBlocks = (props) => {
  const partOfSpeechesBlocks = (
    <ol className={styles.PartOfSpeechBlockList}>
      {Object.keys(props.block).map((key, i) => 
        <PartOfSpeechBlock key={key} partOfSpeech={key} index={i + 1} meanings={props.block[key].meanings} />)}
    </ol>
  );

  const classes = [styles.SemanticBlock];
  if (props.editMode) {
    classes.push(styles.active);
  }

  return (
    <div className={classes.join(' ')}>
      <span className={styles.BlockNumber}>{toRoman(props.num)}</span>
      {partOfSpeechesBlocks}
    </div>
  )
};

export default semanticBlocks;
