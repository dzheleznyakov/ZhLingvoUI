import React from 'react';

import editable from '../../../../hoc/editable/editable';

import styles from './transcription.module.scss';

const transcription = (props) => (
  <span
    className={styles['transcription']}
    onClick={props.clicked}
  >
    {props.children}
  </span>)
;

export default editable(transcription);