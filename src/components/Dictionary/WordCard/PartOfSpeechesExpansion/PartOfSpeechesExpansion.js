import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

import styles from './PartOfSpeechesExpansion.module.scss';

import ThreeDotsButton from '../../../UI/ThreeDotsButton/ThreeDotsButton';
import DisplayList from '../../../UI/Dropdown/DisplayList/DisplayList';
import * as actions from '../../../../store/actions/';

const PartOfSpeechesExpansion = props => {
  const [dropped, setDropped] = useState(false);
  const partsOfSpeech = useSelector(state => _.get(state, 'dictionary.partsOfSpeech'));
  const dispatch = useDispatch();

  const onButtonClicked = () => {
    setDropped(!dropped);
  };

  const onOptionClicked = (partOfSpeech) => {
    setDropped(false);
    dispatch(actions.createPartOfSpeech(props.semanticBlockIndex, partOfSpeech));
  }

  const availablePartsOfSpeech = partsOfSpeech
    .filter(pos => !props.setPartsOfSpeech.find(setPos => setPos === pos));

  return (
    <dl className={styles.PartOfSpeechesExpansion}>
      <dt><ThreeDotsButton clicked={onButtonClicked}/></dt>
      <dd><DisplayList 
        dropped={dropped}
        options={availablePartsOfSpeech}
        clicked={onOptionClicked}
      /></dd>
    </dl>
  );
};

export default PartOfSpeechesExpansion;
