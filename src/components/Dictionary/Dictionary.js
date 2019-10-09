import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

import styles from './Dictionary.module.scss';

import * as actions from '../../store/actions/';
import Spinner from '../UI/Spinner/Spinner';
import DictionaryList from './DictionaryList/DictionaryList';
import WordCard from './WordCard/WordCard';

const dictionary = props => {
  const dispatch = useDispatch();

  const dictionary = useSelector(state => _.get(state, 'dictionary.loadedDictionary'));
  const selectedWordIndex = useSelector(state => _.get(state, 'dictionary.selectedWordIndex'));
  const fetchedWord = useSelector(state => _.get(state, 'dictionary.fetchedWord'));

  useEffect(() => {
    dispatch(actions.loadDictionary());
    dispatch(actions.loadPartsOfSpeeches())
  }, []);

  const dictionaryList = dictionary
    ? <DictionaryList dictionary={dictionary} />
    : <Spinner />;

  let wordCard = null;
  if (dictionary && selectedWordIndex >= 0) {
    const index = selectedWordIndex;
    const wordEntry = dictionary[index];
    wordCard = <WordCard wordEntry={fetchedWord || wordEntry} />;
  }

  return (
    <div className={styles.Dictionary}>
      {dictionaryList}
      {wordCard}
    </div>
  );
}

export default dictionary;