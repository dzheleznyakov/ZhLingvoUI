import React from 'react';
import { connect } from 'react-redux';

import styles from './WordEntry.module.scss';

import * as actions from '../../../../store/actions/';

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
      props.selectWord(prevPos);
    } else if (event.keyCode === 40) {
      event.preventDefault();
      const nextPos = props.pos < props.numberOfPos - 1 ? props.pos + 1 : 0;
      props.selectWord(nextPos);
    }
  };

  const classes = [styles.WordEntry];
  if (props.selected) {
    classes.push(styles.selected)
  }

  const clicked = () => {    
    props.selectWord(props.pos);
    props.fetchWord(props.wordId);
    props.setEditModeFalse();
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

const mapStateToDispatch = dispatch => {
  return {
    fetchWord: (id) => dispatch(actions.fetchWord(id)),
    selectWord: (position) => dispatch(actions.selectWord(position)),
    setEditModeFalse: () => dispatch(actions.setEditMode(false))
  };
};

export default connect(null, mapStateToDispatch)(wordEntry);