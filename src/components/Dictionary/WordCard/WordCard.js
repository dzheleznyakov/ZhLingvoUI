import React from 'react';

import styles from './WordCard.module.css';

import SemanticBlock from './SemanticBlock/SemanticBlock';

const wordCard = (props) => {
  const entry = props.wordEntry;

  let transcriptions = null;
  if (entry.transcriptions && entry.transcriptions.length) {
    transcriptions = (<span className={styles.Transcription}>
      {entry.transcriptions.map(tr => `[${tr}]`).join(' ')}
    </span>);
  }

  let semanticBlocks = null;
  if (entry.semanticBlocks && entry.semanticBlocks.length) {
    semanticBlocks = entry.semanticBlocks
      .map((sb, i) => <SemanticBlock key={i} num={i + 1} block={sb} />)
  }

  return (
    <div className={styles.WordCardContainer}>
      <div className={styles.WordCard}>
        <span className={styles.Word}>{entry.word}</span>
        {transcriptions}
        {semanticBlocks}
      </div>
    </div>
  )
};

export default wordCard;