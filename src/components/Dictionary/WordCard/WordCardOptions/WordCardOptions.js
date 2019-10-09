import React, { useState } from 'react';

import classes from './WordCardOptions.module.scss';

import WordForms from '../WordForms/WordForms';

const wordCardOptions = (props) => {
  const [showWordForms, setShowWordForms] = useState(false);

  const onWordFormsButtonClicked = event => {
    setShowWordForms(true);
  };

  const wordForms = showWordForms
    ? <WordForms closed={() => setShowWordForms(false)} />
    : null;  

  const wordFormsButton = (
    <button 
      className={classes.WordFormsButton}
      onClick={onWordFormsButtonClicked}>W</button>
  );

  return (
    <div className={classes.WordFormsWrapper}>
      {wordForms}
      {wordFormsButton}
    </div>
  );
};

export default wordCardOptions;
