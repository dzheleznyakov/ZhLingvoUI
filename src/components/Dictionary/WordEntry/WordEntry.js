import React from 'react';
import { connect } from 'react-redux';

import styles from './WordEntry.module.css';

import * as actions from '../../../store/actions/';

const wordEntry = (props) => {
  const focusIfSelected = (li) => {
    if (li && props.selected) {
      li.focus();
    }
  };

  const onKeyDown = (event) => {
    if (event.keyCode === 38) {
      event.preventDefault();
      const prevPos = props.pos > 0 ? props.pos - 1 : props.numberOfPos - 1;
      props.onWordSelected(prevPos);
    } else if (event.keyCode === 40) {
      event.preventDefault();
      const nextPos = props.pos < props.numberOfPos - 1 ? props.pos + 1 : 0;
      props.onWordSelected(nextPos);
    }
  };

  return (
    <li 
      className={styles.WordEntry}
      ref={focusIfSelected}
      tabIndex={props.pos}
      onKeyDown={onKeyDown}
      onClick={() => props.onWordSelected(props.pos)}
    >{props.word}</li>
  );
};

const mapStateToDispatch = dispatch => {
  return {
    onWordSelected: (position) => dispatch(actions.selectWord(position)),
  };
};

export default connect(null, mapStateToDispatch)(wordEntry);