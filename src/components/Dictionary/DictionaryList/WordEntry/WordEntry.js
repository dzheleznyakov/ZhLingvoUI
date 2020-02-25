import React from 'react';
import { useDispatch } from 'react-redux';

import styles from './WordEntry.module.scss';

import * as actions from '../../../../store/actions/';

const WordEntry = (props) => {
  const dispatch = useDispatch();

  const focusIfSelected = (li) => {
    if (li && props.selected) {
      li.focus();
    }
  };

  const onKeyDown = (event) => {
    if (event.keyCode === 38) {
      event.preventDefault();
      const prevPos = props.pos > 0 ? props.pos - 1 : props.numberOfPos - 1;
      dispatch(actions.selectWord(prevPos));
    } else if (event.keyCode === 40) {
      event.preventDefault();
      const nextPos = props.pos < props.numberOfPos - 1 ? props.pos + 1 : 0;
      dispatch(actions.selectWord(nextPos));
    }
  };

  const classes = [styles.WordEntry];
  if (props.selected) {
    classes.push(styles.selected)
  }

  const clicked = () => {
    dispatch(actions.selectWord(props.pos));
    dispatch(actions.setEditMode(false));
  };

  return (
    <li
      className={classes.join(' ')}
      ref={focusIfSelected}
      tabIndex={props.pos}
      onKeyDown={onKeyDown}
      onClick={clicked}
    >{props.word}</li>
  );
};

export default WordEntry;