import React from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';

import classes from './DictionaryList.module.scss';

import WordEntry from './WordEntry/WordEntry';
import DictionaryListControl from './DictionaryListControl/DictionaryListControl';

const DictionaryList = props => {
  const selectedWordIndex = useSelector(state => _.get(state, 'dictionary.selectedWordIndex'));
  return (
    <div className={classes.DictionaryListWrapper}>
      <DictionaryListControl />
      <div className={classes.DictionaryListContainer}>
        <ul className={classes.DictionaryList}>
          {props.dictionary
            .map((entry, index) => <WordEntry 
              key={index}
              pos={index}
              numberOfPos={props.dictionary.length}
              word={entry.word}
              wordId={entry.id}
              selected={index === selectedWordIndex}
            />)}
        </ul>
      </div>
    </div>
  );
};

export default DictionaryList;