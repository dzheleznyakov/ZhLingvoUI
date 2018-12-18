import React from 'react';

import styles from './Examples.module.scss';

const emDash = '\u2014';

const examples = (props) => {
  let exampleBlock = null;
  if (props.examples) {
    exampleBlock = props.examples.map((example, index) => (
      <div key={`ex${index}`} className={styles.example}>
        {example.expression}
        {example.remark ? <span className={styles.remark}> {example.remark}</span> : null}
        {` ${emDash} `}
        {example.explanation}
      </div>
    ));
  }
  return exampleBlock;
};

export default examples;