import React from 'react';

import styles from './word-card.module.scss';

import WordCardControl from './WordCardControl/WordCardControl';
import SemanticBlock from './SemanticBlock/SemanticBlock';

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

  return (
    <div>
      <div className={styles['word-card-wrapper']}>
        <WordCardControl />
        <div className={styles['word-card-container']}>
          <div className={styles['word-card']}>
            <span className={styles['word']}>{entry.word}</span>
            {transcriptions}
            {semanticBlocks}
          </div>
        </div>
      </div>
    </div>
  )
};

export default wordCard;