import React from 'react';

import styles from './PartOfSpeechBlock.module.css';

import Meanings from './Meaning/Meanings';
import Examples from './Examples/Examples';

const partOfSpeechBlock = (props) => (
  <li>
    <span className={styles.PartOfSpeech}>{props.partOfSpeech}</span>
    <ol className={styles.MeaningWrapper}>
      {props.meanings.map((meaning, i) => (
        <li key={`m${i}`}>
          <Meanings translations={meaning.translations} remark={meaning.remark} />
          <Examples examples={meaning.examples} />
        </li>
      ))}
    </ol>
  </li>
);

export default partOfSpeechBlock;