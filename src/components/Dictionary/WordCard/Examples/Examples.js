import React from 'react';

import classes from './Examples.module.scss';

import Remark from '../Remark/Remark';

const emDash = '\u2014';

const examples = (props) => {
  let exampleBlock = null;
  if (props.examples) {
    exampleBlock = props.examples.map((example, index) => (
      <div key={`ex${index}`} className={classes.example}>
        {example.expression}
        {example.remark ? <Remark prefix=' '>{example.remark}</Remark> : null}
        {` ${emDash} `}
        {example.explanation}
      </div>
    ));
  }
  return exampleBlock;
};

export default examples;